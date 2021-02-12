export const styleOrientation = (
  lengthColumns: number,
  maxNumberGroups: number,
  padding: number,
  isHorizontal: boolean
) => {
  if (!isHorizontal) {
    if (maxNumberGroups > 1) {
      return {
        minHeight: `${lengthColumns}%`,
        minWidth: `${70 / maxNumberGroups - padding}%`,
        padding: `0 ${padding}% 0 0`,
      }
    } else {
      return {
        minHeight: `${lengthColumns}%`,
        minWidth: `${70 / maxNumberGroups}%`,
      }
    }
  } else {
    if (maxNumberGroups > 1) {
      return {
        minWidth: `${lengthColumns}%`,
        minHeight: `${70 / maxNumberGroups - padding}%`,
        padding: `0 0 ${padding}% 0`,
      }
    } else {
      return {
        minWidth: `${lengthColumns}%`,
        minHeight: `${70 / maxNumberGroups}%`,
      }
    }
  }
}
