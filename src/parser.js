const validateInput = (text) => {
  if (!text) {
    return false;
  }

  // TODO: support other coin than BTC
  if (!text.includes('BTC')) {
    return false;
  }

  if (
    !text.includes('BUY') &&
    !text.includes('SELL') &&
    !text.includes('LONG') &&
    !text.includes('SHORT')
  ) {
    return false;
  }

  // Check to ignore message with both BUY/LONG and SELL/SHORT
  if (
    text.includes('BUY') &&
    (text.includes('SELL') || text.includes('SHORT'))
  ) {
    return false;
  }

  if (
    text.includes('SELL') &&
    (text.includes('BUY') || text.includes('LONG'))
  ) {
    return false;
  }

  return true;
};

const parseMessage = (text) => {
  const validate = validateInput(text);

  if (!validate) {
    return null;
  }

  const entry = text.match(/(?:Entry: )([$?0-9.]+)/);
  const sl = text.match(/(?:SL: )([$?0-9.]+)/);
  const tp = text.match(/(?:TP1: )([$?0-9.]+)/);

  if (!entry || !sl || !tp) {
    return null;
  }

  let side;

  if (text.includes('BUY') || text.includes('LONG')) {
    side = 'LONG';
  } else if (text.includes('SELL') || text.includes('SHORT')) {
    side = 'SHORT';
  }

  return {
    pair: 'BTCUSDT',
    side,
    entry: entry[1].includes('$') ? entry[1].replace('$', '') : entry[1], // remove $ character if have
    sl: sl[1].includes('$') ? sl[1].replace('$', '') : sl[1],
    tp: tp[1].includes('$') ? tp[1].replace('$', '') : tp[1],
  };
};

module.exports = {
  parseMessage,
};
