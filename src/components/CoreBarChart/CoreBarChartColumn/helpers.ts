const maxPercentageWidth = 100;

export const styleOrientation = (
  lengthColumns: number,
  maxNumberGroups: number,
  isHorizontal: boolean,
  height: number,
) => {
  const padding = isHorizontal
    ? Math.max(height * 0.2, 1)
    : (maxPercentageWidth / maxNumberGroups) * 0.2;

  if (!isHorizontal) {
    if (maxNumberGroups > 1) {
      return {
        minHeight: `${lengthColumns}%`,
        width: `${maxPercentageWidth / maxNumberGroups - padding}%`,
        padding: `0 ${padding}% 0 0`,
      };
    }
    return {
      minHeight: `${lengthColumns}%`,
      width: `${maxPercentageWidth / maxNumberGroups}%`,
    };
  }
  if (maxNumberGroups > 1) {
    return {
      minWidth: `${lengthColumns}%`,
      height: `${maxPercentageWidth / maxNumberGroups - padding}%`,
      padding: `0 0 ${padding}px 0`,
    };
  }
  return {
    minWidth: `${lengthColumns}%`,
    height: `${maxPercentageWidth / maxNumberGroups}%`,
  };
};
