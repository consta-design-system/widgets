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
    const meanMaxValue = maxValue / 2

    if (isNegative) {
      const meanMinValue = 1 * -meanMaxValue

      if (meanMinValue <= minValue || meanMinValue * 1.5 < minValue) {
        return [minValue, 0, meanMaxValue, maxValue]
      }
      return [minValue, meanMinValue, 0, meanMaxValue, maxValue]
    }

    return [0, meanMaxValue, maxValue]
  }

  if (count > 3) {
    const ticksArray = ticks(minValue, maxValue, count)
    const newTicksArray = ticksArray.slice(1, ticksArray.length - 1)
    const newTicks: number[] = []

    return isNegative
      ? newTicks.concat(minValue, newTicksArray, maxValue)
      : newTicks.concat(0, newTicksArray, maxValue)
  }

  return ticks(minValue, maxValue, count)
}
