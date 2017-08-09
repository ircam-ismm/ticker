const Ticker = require('../../dist/Ticker').default;

console.log(Ticker);

const ticker = new Ticker(1000, (logicalTime) => {
  console.log('should tick every 1000 millisecond', logicalTime);

  if (logicalTime >= 10 * 1000)
    ticker.stop();
});

ticker.start();

