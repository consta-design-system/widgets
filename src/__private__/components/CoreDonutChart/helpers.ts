import { HalfDonut } from './CoreDonutChartPie/CoreDonutChartPie'

export const MAX_CIRCLES_TO_RENDER = 3

export const minChartSize: Record<number, number> = {
  1: 50,
  2: 100,
  3: 150,
}

export type Data = {
  name: string
  color: string
  values: ReadonlyArray<number | null>
}
export type GetCirclesCount = (data: readonly Data[]) => number

export type GetMinChartSize = (
  circlesCount: number,
  isExistTextData?: boolean,
  halfDonut?: HalfDonut
) => number

export const donutSize: Record<number, number> = {
  1: 18,
  2: 14,
  3: 10,
}

export const paddingBetweenDonuts: Record<number, number> = {
  1: 0,
  2: 12,
  3: 16,
}

export const isHalfDonutHorizontal = (halfDonut?: HalfDonut) => {
  return halfDonut === 'top' || halfDonut === 'bottom'
}

export const isHalfDonutVertical = (halfDonut?: HalfDonut) => {
  return halfDonut === 'right' || halfDonut === 'left'
}

export const getPadding = (countLines: number) => {
  return paddingBetweenDonuts[countLines]
}

export const getChartSize = ({
  width,
  height,
  halfDonut,
}: {
  width: number
  height: number
  halfDonut?: HalfDonut
}) => {
  if (isHalfDonutHorizontal(halfDonut)) {
    return Math.min(width, height * 2)
  }

  if (isHalfDonutVertical(halfDonut)) {
    return Math.min(width * 2, height)
  }

  return Math.min(width, height)
}

export const getSizeDonut = (
  countLines: number,
  isExistTextData?: boolean,
  halfDonut?: HalfDonut
) => {
  return halfDonut || isExistTextData ? 16 : donutSize[countLines]
}

export const getDonutRadius = (mainRadius: number, index: number, countLines: number) => {
  return mainRadius - (getSizeDonut(countLines) + getPadding(countLines)) * index
}

export const defaultGetCirclesCount: GetCirclesCount = data => {
  if (!data.length) {
    return 0
  }

  return Math.min(Math.max(...data.map(i => i.values.length)), MAX_CIRCLES_TO_RENDER)
}

export const defaultGetMinChartSize: GetMinChartSize = (
  countLines: number,
  isExistTextData?: boolean,
  halfDonut?: HalfDonut
) => {
  if (countLines === 1 && isExistTextData && !halfDonut) {
    return 96
  }

  if (countLines === 1 && isExistTextData && halfDonut) {
    return 170
  }

  return minChartSize[countLines]
}
