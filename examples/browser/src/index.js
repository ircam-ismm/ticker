import * as lfo from 'waves-lfo/client';
import * as controllers from 'basic-controllers';
import Ticker from '@ircam/ticker';

const period = 20;

// timeout ticker
const eventInTimeout = new lfo.source.EventIn({
  frameType: 'vector',
  frameSize: 3,
  frameRate: period,
});

const signalSinkTimeout = new lfo.sink.BpfDisplay({
  container: '#timeout',
  width: 400,
  height: 200,
  min: -4,
  max: 4,
  duration: 10,
});

eventInTimeout.connect(signalSinkTimeout);
eventInTimeout.start();

const movingAverage = new lfo.operator.MovingAverage({ order: 20 });
movingAverage.initStream({ frameType: 'scalar' });

const timer = new Ticker(period, (logicalTime, currentTime, error) => {
  const mean = movingAverage.inputScalar(error);
  eventInTimeout.process(null, [error, mean, 0]);
});

const startStop = new controllers.SelectButtons({
  label: '&nbsp;',
  options: ['start', 'stop'],
  default: 'stop',
  container: '#controls',
  callback: (value) => {
    timer[value]();
  },
});

const periodControl = new controllers.Slider({
  label: 'period',
  min: 15,
  max: 1000,
  default: 20,
  step: 1,
  container: '#controls',
  callback: (value) => {
    timer.period = value;
  },
});

