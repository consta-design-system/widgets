import {
  ArcDataItem,
  DonutDataItem,
  HalfDonut,
} from '@/__private__/components/CoreDonutChart/helpers'

export const DUMMY_ARC_NAME = '@arc:empty'

export const legendPositions = ['top', 'right', 'bottom', 'left'] as const
export type LegendPosition = typeof legendPositions[number]

export const getTotalByCircle = (circles: readonly DonutDataItem[]) => {
  return circles.reduce<readonly number[]>(
    (acc, insetArray) => insetArray.values.map((value, index) => acc[index] + (value ?? 0)),
    new Array(circles.length).fill(0)
  )
}

export const getDiffsByTotalFromCircles = (totals: readonly number[], sums: readonly number[]) => {
  return totals.map((total, totalIdx) => {
    const diff = (sums[totalIdx] ?? 0) - total
    return diff > 0 ? diff : 0
  })
}

export const getComputedData = (circles: readonly DonutDataItem[], sums?: readonly number[]) => {
  if (!sums || sums.length === 0) {
    return circles
  }

  const totals = getTotalByCircle(circles)
  const diffs = getDiffsByTotalFromCircles(totals, sums)

  return circles.concat({
    name: DUMMY_ARC_NAME,
    color: 'var(--color-control-bg-disable)',
    values: diffs,
  })
}

export const filterComputedData = (item: ArcDataItem) => {
  return item.name !== DUMMY_ARC_NAME
}

export const getLimitSizeSide = (legendPosition?: LegendPosition, halfDonut?: HalfDonut) => {
  if (
    (legendPosition === 'right' || legendPosition === 'left') &&
    (halfDonut === 'right' || halfDonut === 'left')
  ) {
    return 'width'
  }

  if (
    (legendPosition === 'top' || legendPosition === 'bottom') &&
    (halfDonut === 'top' || halfDonut === 'bottom')
  ) {
    return 'height'
  }

  if (!legendPosition) {
    return
  }

  if (legendPosition === 'right' || legendPosition === 'left') {
    return 'width'
  }

  if (legendPosition === 'top' || legendPosition === 'bottom') {
    return 'height'
  }

  return
}
