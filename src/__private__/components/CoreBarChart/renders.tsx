import React from 'react'

import { LabelSize } from '@/__private__/components/CoreBarChart/CoreBarChart'
import { FormatGroupName, FormatValue } from '@/__private__/types'
import { NumberRange, Scaler } from '@/__private__/utils/scale'

import { CoreBarChartGroup, GroupItem } from './CoreBarChartGroup/CoreBarChartGroup'
import { CoreBarChartTicks, Position } from './CoreBarChartTicks/CoreBarChartTicks'
import { TooltipData } from './CoreBarChartTooltip/CoreBarChartTooltip'

export type RenderGroupsLabels = (props: {
  values: readonly string[]
  position: Position
  isXAxisLabelsSlanted?: boolean
  showGroupsLabels?: boolean
  getGridAreaName: (index: number) => string
  formatGroupName?: FormatGroupName
}) => React.ReactElement | null

export const defaultRenderGroupsLabels: RenderGroupsLabels = ({ ...rest }) => {
  return <CoreBarChartTicks {...rest} isLabel />
}

export type RenderAxisValues = (props: {
  values: readonly number[]
  scaler: Scaler<number>
  position: Position
  formatValueForLabel?: FormatValue
  showGroupsLabels?: boolean
}) => React.ReactElement | null

export const defaultRenderAxisValues: RenderAxisValues = ({ ...rest }) => {
  return <CoreBarChartTicks {...rest} />
}

export type RenderGroup<T> = (props: {
  item: T
  index: number
  isLast: boolean
  isFirst: boolean
  showValues: boolean
  showReversed: boolean
  isHorizontal: boolean
  activeGroup?: string
  activeSectionIndex?: number
  scalerMaxValue: (value: number) => number
  scalerMinValue: (value: number) => number
  maxNumberGroups: number
  columnLength: number
  reversedColumnLength?: number
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  formatValueForLabel: FormatValue
  onChangeLabelSize?: (size: LabelSize) => void
  getNumberGridTicks: (length: number) => void
  gridDomain: NumberRange
  limitMinimumStepSize?: boolean
}) => React.ReactElement | null

export const defaultRenderGroup: RenderGroup<GroupItem> = props => <CoreBarChartGroup {...props} />
