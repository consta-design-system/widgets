// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flow =
  (functions: any[]) =>
  (...args: any[]) =>
    functions.reduce((prev, func) => [func(...prev)], args)[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flowRight =
  (functions: any[]) =>
  (...args: any[]) =>
    [...functions].reverse().reduce((prev, func) => [func(...prev)], args)[0];

export const isNumber = <T>(arg: T) => typeof arg === 'number';

export const omit = <T>(obj: T, props: Array<keyof T>) => {
  const newObj = { ...obj };
  props.forEach((prop) => delete newObj[prop]);

  return newObj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObjectsEqual = (obj1: any, obj2: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (obj: any) => obj != null && typeof obj === 'object';

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !isObjectsEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const times = (n: number, func = (i: any) => i) =>
  Array.from({ length: n }).map((_, i) => func(i));
