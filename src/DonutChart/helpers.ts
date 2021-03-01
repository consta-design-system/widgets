import { Data } from '@/__private__/components/CoreDonutChart/helpers'
import { DataItem } from '@/__private__/components/CoreDonutChart/CoreDonutChartPie/CoreDonutChartPie'

export const DUMMY_ARC_NAME = '@arc:empty'

export const legendPositions = ['top', 'right', 'bottom', 'left'] as const
export type LegendPosition = typeof legendPositions[number]

export const getTotalByCircle = (circles: readonly Data[]) => {
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

export const getComputedData = (circles: readonly Data[], sums?: readonly number[]) => {
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

export const filterComputedData = (item: DataItem) => {
  return item.name !== DUMMY_ARC_NAME
}

export const getLimitSizeSide = (legendPosition?: LegendPosition) => {
  if (!legendPosition) {
    return
  }

  if (legendPosition === 'right' || legendPosition === 'left') {
    return 'width'
  }

  return 'height'
}
