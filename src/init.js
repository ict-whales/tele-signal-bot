const ccxt = require('ccxt');

const initBinanceFutureInstance = () => {
  const binance = new ccxt.binanceusdm({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET,
    enableRateLimit: true,
  });

  return binance;
};

const initFTXInstance = () => {
  const ftx = ccxt.ftx({
    apiKey: process.env.FTX_API_KEY,
    secret: process.env.FTX_API_SECRET,
    enableRateLimit: true,
  });

  return ftx;
};

module.exports = {
  initBinanceFutureInstance,
  initFTXInstance,
};
