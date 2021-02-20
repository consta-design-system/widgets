import React from 'react'

import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/__private__/components/CoreBarChart/helpers'
import { defaultRenderGroup } from '@/__private__/components/CoreBarChart/renders'
import { CoreBarChart, Threshold } from '@/__private__/components/CoreBarChart/CoreBarChart'
import { FormatGroupName, FormatValue } from '@/__private__/types'

import {
  getColumnsLengthArray,
  getMaxNumberGroupsArray,
  getMaxOfArray,
  getMinOfArray,
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
  formatGroupName?: FormatGroupName
  isEmptyColumnsHidden?: boolean
  showGrid?: boolean
  showLineAtZero?: boolean
  showGroupsLabels?: boolean
  minCategorySizeLimit?: boolean
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
    formatGroupName,
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

  const maxColumnLength = getMaxOfArray(columnsLengthArray)
  const minReversedColumnLength = getMinOfArray(reversedColumnsLengthArray)

  const maxNumberGroupsArray = getMaxNumberGroupsArray(commonGroups)
  const maxNumberGroups = getMaxOfArray(maxNumberGroupsArray)

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
      formatGroupName={formatGroupName}
    />
  )
}
