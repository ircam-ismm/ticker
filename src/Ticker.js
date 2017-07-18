/**
 * @callback TickerCallback
 * @param {Number} logicalTime - logical time since `start` in ms
 * @param {Number} currentTime - current time as returned by `performance.now`
 * @param {Number} error - current error
 */

/**
 * Precise periodic timer (based on `setTimeout`) that monitor and adapt itself
 * to stay close to the given therical period. In particular, try to minimize
 * the drift caused by the use of a raw `setTimeout`.
 * Observed average jitter is around +/- 2ms.
 *
 * @param {Number} period - period of the timer interval in milliseconds
 *  (floored if float is given)
 * @param {TickerCallback} callback - callback to execute on each tick
 * @param {Object} options - additionnal options
 * @param {Number} [options.errorThreshold] - Threshold error where the timer
 *  considers itself as out of bounds. Increasing this value tends to increase
 *  the overall jitter.
 */
class Ticker {
  constructor(period, callback, {
    errorThreshold = 0.2,
  } = {}) {
    period = Math.floor(period);
    this.logicalPeriod = period;
    this.computedPeriod = period;
    this.callback = callback;

    this._tick = this._tick.bind(this);
    this.isRunning = false;

    this.errorThreshold = errorThreshold;
  }

  /**
   * Period of the timer. Must be an integer, the given value is floored.
   * When updated the new value is applied at the next tick.
   *
   * @name period
   * @type {Number}
   * @instance
   * @memberof Ticker
   */
  set period(value) {
    value = Math.floor(value);
    this.logicalPeriod = value;
    this.computedPeriod = value;
  }

  get period() {
    return this.logicalPeriod;
  }

  /**
   * Start the ticker instance.
   */
  start() {
    if (!this.isRunning) {
      this.startTime = performance.now();
      this.logicalTime = 0;

      this._tick(); // run now

      this.isRunning = true;
    }
  }

  /**
   * Stop the ticker instance.
   */
  stop() {
    clearTimeout(this.timeoutId);
    this.isRunning = false;
  }

  /** @private */
  _tick() {
    const now = performance.now();
    const time = now - this.startTime;
    const error = time - this.logicalTime;

    if (error >= this.errorThreshold)
      this.computedPeriod = this.computedPeriod - 1;

    if (error < -this.errorThreshold)
      this.computedPeriod = this.logicalPeriod;

    this.timeoutId = setTimeout(this._tick, this.computedPeriod);

    this.callback(this.logicalTime, now, error);
    // next call time
    this.logicalTime += this.logicalPeriod;
  }
}

export default Ticker;
