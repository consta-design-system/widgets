export const styleOrientation = (
  lengthColumns: number,
  maxNumberGroups: number,
  maxPercentageWidth: number,
  padding: number,
  isHorizontal: boolean
) => {
  if (!isHorizontal) {
    if (maxNumberGroups > 1) {
      return {
        minHeight: `${lengthColumns}%`,
        minWidth: `${maxPercentageWidth / maxNumberGroups - padding}%`,
        padding: `0 ${padding}% 0 0`,
      }
    } else {
      return {
        minHeight: `${lengthColumns}%`,
        minWidth: `${maxPercentageWidth / maxNumberGroups}%`,
      }
    }
  } else {
    if (maxNumberGroups > 1) {
      return {
        minWidth: `${lengthColumns}%`,
        minHeight: `${maxPercentageWidth / maxNumberGroups - padding}%`,
        padding: `0 0 ${padding}px 0`,
      }
    } else {
      return {
        minWidth: `${lengthColumns}%`,
        minHeight: `${maxPercentageWidth / maxNumberGroups}%`,
      }
    }
  }
}
