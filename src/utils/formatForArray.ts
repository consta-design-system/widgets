import { formatForValue } from './formatForValue';

export const formatForArray = (valueArray: number[]) => {
  let num: number = 0;

  valueArray.map((item: number) => {
    if (String(item).indexOf('.') > 0) {
      const digitsLength = String(item).split('.')[1].length;

      if (digitsLength > num) {
        num = digitsLength;
      } else {
        // eslint-disable-next-line no-useless-return
        return;
      }
    }
  });

  return valueArray.map((item: number) =>
    formatForValue(String(item.toFixed(num))),
  );
};
