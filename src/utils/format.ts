import BigNumber from 'bignumber.js';

export function formatTokenPrice(
  price: number | BigNumber | string,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const priceBig: BigNumber = BigNumber.isBigNumber(price) ? price : new BigNumber(price);
  if (priceBig.isNaN()) return `${price}`;

  const min = BigNumber(1).div(BigNumber(10).exponentiatedBy(decimalPlaces)).toFormat();

  if (!priceBig.isEqualTo(0) && priceBig.lt(min)) {
    return `< ${min}`;
  }

  const priceFixed = priceBig.toFixed(decimalPlaces, roundingMode);
  const res = new BigNumber(priceFixed).toFormat();
  return res;
}

const KUnit = 1000;
const MUnit = KUnit * 1000;
const BUnit = MUnit * 1000;
const TUnit = BUnit * 1000;

export function formatNumber(
  number: number | string | BigNumber,
  toFixedProps?: {
    decimalPlaces?: number;
    roundingMode?: BigNumber.RoundingMode;
  },
) {
  const { decimalPlaces = 4, roundingMode = BigNumber.ROUND_DOWN } = toFixedProps || {};
  const numberBig: BigNumber = BigNumber.isBigNumber(number) ? number : new BigNumber(number);
  if (numberBig.isNaN() || numberBig.eq(0)) return '0';

  const regexp = /(?:\.0*|(\.\d+?)0+)$/;

  const abs = numberBig.abs();
  if (abs.gt(TUnit)) {
    return BigNumber(numberBig.div(TUnit).toFixed(decimalPlaces, roundingMode)).toFormat().replace(regexp, '$1') + 'T';
  } else if (abs.gte(BUnit)) {
    return BigNumber(numberBig.div(BUnit).toFixed(decimalPlaces, roundingMode)).toFormat().replace(regexp, '$1') + 'B';
  } else if (abs.gte(MUnit)) {
    return BigNumber(numberBig.div(MUnit).toFixed(decimalPlaces, roundingMode)).toFormat().replace(regexp, '$1') + 'M';
  } else if (abs.gte(KUnit)) {
    return BigNumber(numberBig.div(KUnit).toFixed(decimalPlaces, roundingMode)).toFormat().replace(regexp, '$1') + 'K';
  } else {
    return BigNumber(numberBig.toFixed(2, roundingMode)).toFormat();
  }
}
