import { ticks } from 'd3-array'

export const getTicks = (items: readonly number[], count: number) => {
  if (count === 0) {
    return []
  }

  const minValue = Math.min(...items)
  const maxValue = Math.max(...items)
  const isNegative = minValue < 0

  if (count === 1 || count === 2) {
    return isNegative ? [minValue, 0, maxValue] : [minValue, maxValue]
  }

  if (count === 3) {
    const meanMinValue = minValue / 2
    const meanMaxValue = maxValue / 2

    return isNegative
      ? [minValue, meanMinValue, 0, meanMaxValue, maxValue]
      : [0, meanMaxValue, maxValue]
  }

  return ticks(minValue, maxValue, count)
}
