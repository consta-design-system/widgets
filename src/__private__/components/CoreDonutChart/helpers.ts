import { CSSProperties } from 'react'

import { DataItem, HalfDonut } from './CoreDonutChartPie/CoreDonutChartPie'

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

export type LimitSizeSide = 'width' | 'height'

export type SortValue = (prev: DataItem, next: DataItem) => number

export const donutSizeInPercent: Record<number, number> = {
  1: 0.12,
  2: 0.1,
  3: 0.08,
}

export const paddingBetweenDonutsInPercent: Record<number, number> = {
  1: 0,
  2: 0.08,
  3: 0.06,
}

export const isHalfDonutHorizontal = (halfDonut?: HalfDonut) => {
  return halfDonut === 'top' || halfDonut === 'bottom'
}

export const isHalfDonutVertical = (halfDonut?: HalfDonut) => {
  return halfDonut === 'right' || halfDonut === 'left'
}

export const getPadding = (circlesCount: number, chartSize: number) => {
  return chartSize * paddingBetweenDonutsInPercent[circlesCount]
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

export const getSizeDonut = (circlesCount: number, chartSize: number) => {
  return chartSize * donutSizeInPercent[circlesCount]
}

export const getDonutRadius = ({
  mainRadius,
  index,
  circlesCount,
  chartSize,
}: {
  mainRadius: number
  index: number
  circlesCount: number
  chartSize: number
}) => {
  return (
    mainRadius -
    (getSizeDonut(circlesCount, chartSize) + getPadding(circlesCount, chartSize)) * index
  )
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

export const defaultSortValue: SortValue = (prev, next) => {
  return next.value - prev.value
}

type GetSizeRectParams = {
  width: number
  height: number
  minSize: number
  isHalfVertical: boolean
  isHalfHorizontal: boolean
  limitSizeSide?: LimitSizeSide
}

export const getDonutMaxMinSizeRect = ({
  height,
  width,
  minSize,
  isHalfVertical,
  isHalfHorizontal,
  limitSizeSide,
}: GetSizeRectParams): CSSProperties => {
  const halfWidth = width / 2
  const halfHeight = height / 2
  const maxWidth = limitSizeSide === 'width' ? height : undefined
  const maxHeight = limitSizeSide === 'height' ? width : undefined

  return {
    minWidth: isHalfVertical ? halfHeight : minSize,
    maxWidth: isHalfVertical ? halfHeight : maxWidth,
    minHeight: isHalfHorizontal ? halfWidth : minSize,
    maxHeight: isHalfHorizontal ? halfWidth : maxHeight,
  }
}
