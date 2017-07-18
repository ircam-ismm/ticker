# @ircam/ticker

> Execute a given callback at periodic interval, trying to minimize drift and jitter.

## Install

```
npm install [--save] @ircam/ticker
```

## Usage

```js
import ticker from '@ircam/ticker'

// @todo
```

# API

<a name="Ticker"></a>

## Ticker
Precise timer (based on `setTimeout`) that monitor and adapt itself to stay
close from the given therical period. In particular, try to minimize the
drift caused by the use of a raw `setTimeout`.
Observed average jitter is around +/- 2ms.

**Kind**: global class  

* [Ticker](#Ticker)
    * [new Ticker(period, callback, options)](#new_Ticker_new)
    * [.period](#Ticker+period) : <code>Number</code>
    * [.start()](#Ticker+start)
    * [.stop()](#Ticker+stop)

<a name="new_Ticker_new"></a>

### new Ticker(period, callback, options)

| Param | Type | Description |
| --- | --- | --- |
| period | <code>Number</code> | period of the timer interval in milliseconds  (floored if float is given) |
| callback | [<code>TickerCallback</code>](#TickerCallback) | callback to execute on each tick |
| options | <code>Object</code> | additionnal options |
| [options.errorThreshold] | <code>Number</code> | Threshold error where the timer  considers itself as out of bounds. Increasing this value tends to increase  the overall jitter. |

<a name="Ticker+period"></a>

### ticker.period : <code>Number</code>
Period of the timer. Must be an integer, the given value is floored.
When updated the new value is applied at the next tick.

**Kind**: instance property of [<code>Ticker</code>](#Ticker)  
<a name="Ticker+start"></a>

### ticker.start()
Start the ticker instance.

**Kind**: instance method of [<code>Ticker</code>](#Ticker)  
<a name="Ticker+stop"></a>

### ticker.stop()
Stop the ticker instance.

**Kind**: instance method of [<code>Ticker</code>](#Ticker)  
<a name="TickerCallback"></a>

## TickerCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| logicalTime | <code>Number</code> | logical time since `start` in ms |
| currentTime | <code>Number</code> | current time as returned by `performance.now` |
| error | <code>Number</code> | current error |



## License

BSD-3-Clause

