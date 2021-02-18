import React from 'react'

import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/__private__/components/CoreBarChart/helpers'
import { defaultRenderGroup } from '@/__private__/components/CoreBarChart/renders'
import { CoreBarChart, Threshold } from '@/__private__/components/CoreBarChart/CoreBarChart'
import { FormatValue } from '@/__private__/types'

import {
  getColumnsLengthArray,
  getMaxNumberGroupsArray,
  transformGroupsToCommonGroups,
} from './helpers'

export type ColumnItem = {
  value: number | undefined
  color: string
}

export type Column = readonly ColumnItem[]

export type Group = {
  groupName: string
  values: ReadonlyArray<Column | undefined | null>
}

type Props = {
  groups: readonly Group[]
  unit?: string
  showValues?: boolean
  isHorizontal?: boolean
  withScroll?: boolean
  threshold?: Threshold
  title?: React.ReactNode
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  isXAxisLabelsSlanted?: boolean
  minValueY?: number
  maxValueY?: number
  showGrid?: boolean
  showLineAtZero?: boolean
  showGroupsLabels?: boolean
  limitMinimumCategorySize?: boolean
}

export const StackedBarChart: React.FC<Props> = props => {
  const { groups, threshold, showValues, minValueY, maxValueY, ...rest } = props

  const commonGroups = transformGroupsToCommonGroups(groups)
  const showReversed = isShowReversed({ groups: commonGroups, threshold: props.threshold })
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    minValueY,
    maxValueY,
    threshold: props.threshold,
  })

  const groupTotalArray = getColumnsLengthArray(commonGroups)
  const maxGroupTotalLength = groupTotalArray.length > 0 ? Math.max.apply(null, groupTotalArray) : 0

  const maxNumberGroupsArray = getMaxNumberGroupsArray(commonGroups)
  const maxNumberGroups: number =
    maxNumberGroupsArray.length > 0 ? Math.max.apply(null, maxNumberGroupsArray) : 0

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      showValues={showValues}
      showReversed={showReversed}
      threshold={threshold}
      renderGroup={defaultRenderGroup}
      maxNumberGroups={maxNumberGroups}
      maxColumnLength={maxGroupTotalLength}
    />
  )
}
