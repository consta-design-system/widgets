import React from 'react'

import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/__private__/components/BarChart/helpers'
import { defaultRenderGroup } from '@/__private__/components/BarChart/renders'
import { CoreBarChart, Threshold } from '@/__private__/components/BarChart/BarChart'
import { FormatValue } from '@/__private__/types'

import {
  getColumnsLengthArray,
  getMaxNumberGroupsArray,
  transformGroupsToCommonGroups,
} from './helpers'

export type Column = number | undefined

export type Group = {
  groupName: string
  values: readonly Column[]
}

type Props = {
  groups: readonly Group[]
  minValueY?: number
  maxValueY?: number
  colors: readonly string[]
  unit?: string
  showValues?: boolean
  isHorizontal?: boolean
  withScroll?: boolean
  isXAxisLabelsSlanted?: boolean
  threshold?: Threshold
  title?: React.ReactNode
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  isEmptyColumnsHidden?: boolean
  showGrid?: boolean
  showLineAtZero?: boolean
  showGroupsLabels?: boolean
  limitMinimumCategorySize?: boolean
}

export const BarChart: React.FC<Props> = props => {
  const {
    groups,
    minValueY,
    maxValueY,
    colors,
    threshold,
    showValues,
    showGrid,
    showLineAtZero,
    showGroupsLabels,
    isEmptyColumnsHidden = false,
    ...rest
  } = props

  const commonGroups = transformGroupsToCommonGroups(groups, colors, isEmptyColumnsHidden)
  const showReversed = isShowReversed({ groups: commonGroups, threshold: props.threshold })
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    minValueY,
    maxValueY,
    threshold: props.threshold,
  })

  const columnsLengthArray = getColumnsLengthArray(commonGroups, 'columns')
  const reversedColumnsLengthArray = getColumnsLengthArray(commonGroups, 'reversedColumns')
  const maxColumnLength =
    columnsLengthArray.length > 0 ? Math.max.apply(null, columnsLengthArray) : 0
  const minReversedColumnLength =
    reversedColumnsLengthArray.length > 0 ? Math.min.apply(null, reversedColumnsLengthArray) : 0

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
      maxColumnLength={maxColumnLength}
      minReversedColumnLength={minReversedColumnLength}
      renderGroup={defaultRenderGroup}
      showGrid={showGrid}
      showLineAtZero={showLineAtZero}
      showGroupsLabels={showGroupsLabels}
      maxNumberGroups={maxNumberGroups}
    />
  )
}
