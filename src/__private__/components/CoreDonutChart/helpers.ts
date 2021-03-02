import { CSSProperties } from 'react'

import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array'
import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import { arc, pie, PieArcDatum } from 'd3-shape'

export const halvesDonut = ['top', 'right', 'bottom', 'left'] as const
export type HalfDonut = typeof halvesDonut[number]

export type DonutDataItem = {
  name: string
  color: string
  values: ReadonlyArray<number | null>
}

export type ArcDataItem = {
  value: number | null
  color: string
  name: string
}

export type SortValue = (prev: ArcDataItem, next: ArcDataItem) => number

export type LimitSizeSide = 'width' | 'height'

export type ArcRadius = {
  inner: number
  outer: number
}

export const MAX_CIRCLES_TO_RENDER = 3

/**
 * Отступ между D3.arc элементами, указывается в пикселях.
 */
export const ARC_PAD = 1
export const ARC_RADIUS = 100
export const ARC_FULL_ANGLE = {
  startAngle: 0,
  endAngle: 2 * Math.PI,
}

export const EMPTY_PIE_ARC_DATUM: PieArcDatum<ArcDataItem> = {
  data: {
    color: 'var(--color-bg-ghost)',
    name: '',
    value: null,
  },
  endAngle: 0,
  index: 0,
  padAngle: 0,
  startAngle: 0,
  value: 0,
}

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

export type GetCirclesCount = (data: readonly DonutDataItem[]) => number

export type GetMinChartSize = (
  circlesCount: number,
  isExistTextData?: boolean,
  halfDonut?: HalfDonut
) => number

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
    return 100
  }

  return 0
}

export const getArcAnglesByHalfDonut = (halfDonut?: HalfDonut) => {
  switch (halfDonut) {
    case 'top': {
      return {
        startAngle: Math.PI * 1.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'right': {
      return {
        startAngle: 2 * Math.PI,
        endAngle: Math.PI,
      }
    }
    case 'bottom': {
      return {
        startAngle: Math.PI * -0.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'left': {
      return {
        startAngle: 0,
        endAngle: Math.PI,
      }
    }
    default: {
      return ARC_FULL_ANGLE
    }
  }
}

type GetArcRadiusesParams = {
  mainRadius: number
  circlesCount: number
  sizeDonut: number
  chartSize: number
}

export const getArcRadiuses = (params: GetArcRadiusesParams): readonly ArcRadius[] => {
  return createArrayOfIndexes(params.circlesCount).map(index => {
    const outer = getDonutRadius({
      index,
      chartSize: params.chartSize,
      circlesCount: params.circlesCount,
      mainRadius: params.mainRadius,
    })
    const inner = outer - params.sizeDonut

    return { outer, inner }
  })
}

export const getPieData = (data: readonly ArcDataItem[], halfDonut?: HalfDonut) => {
  const { startAngle, endAngle } = getArcAnglesByHalfDonut(halfDonut)

  const dataGenerator = pie<ArcDataItem>()
    .sort(null)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .value(item => item.value ?? 0)

  return dataGenerator([...data])
}

export const getRenderArc = (radius: ArcRadius) => {
  return (
    arc<unknown, PieArcDatum<ArcDataItem>>()
      .innerRadius(radius.inner)
      .outerRadius(radius.outer)
      /**
       * padAngle для каждого D3.arc расчитывается по формуле:
       *
       * `padRadius * [переданное значение]`
       *
       * https://github.com/d3/d3-shape#arc_padAngle
       */
      .padAngle(ARC_PAD / ARC_RADIUS)
      /**
       * Указывается специфичный радиус для правильного расчета `padAngle`, если
       * не указать значение или указать `null`, то расчет этого параметра
       * производится по формуле:
       *
       * `sqrt(innerRadius * innerRadius + outerRadius * outerRadius)`
       *
       * Т.е. для каждого вложенного компонента Donut, размер отступа будет меньше
       * чем у предыдущего, чтобы это исправить указываем фиксированное значение
       * которое исправляет расчеты.
       *
       * https://github.com/d3/d3-shape#arc_padRadius
       */
      .padRadius(ARC_RADIUS)
  )
}

export const isEmptyPieArcDatum = (value: ReadonlyArray<PieArcDatum<ArcDataItem>>) => {
  return value.every(item => item.value === 0)
}

type GetValuesParams = {
  data: readonly DonutDataItem[]
  circlesCount: number
  sortValue?: SortValue | null
}

export const getValues = ({ circlesCount, data, sortValue }: GetValuesParams) => {
  const arraysOfDataItems = data.map(item =>
    item.values.slice(0, circlesCount).map(value => ({
      color: item.color,
      name: item.name,
      value,
    }))
  )

  return createArrayOfIndexes(circlesCount).map((_, index) =>
    arraysOfDataItems
      .map(dataItems => dataItems[index])
      .sort((prev, next) => (sortValue ? sortValue(prev, next) : 0))
  )
}

export const defaultSortValue: SortValue = (prev, next) => {
  if (!isNotNil(prev.value) || !isNotNil(next.value)) {
    return 0
  }

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
