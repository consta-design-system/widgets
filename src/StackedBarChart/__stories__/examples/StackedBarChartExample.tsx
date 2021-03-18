import React from 'react'

import { Example } from '@/__private__/storybook'
import { interactiveData, withTwoColumnsData } from '@/StackedBarChart/data.mock'
import { StackedBarChart } from '@/StackedBarChart/StackedBarChart'

export const StackedBarChartExampleMin = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} />
  </Example>
)

export const StackedBarChartExampleSlanted = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isXAxisLabelsSlanted />
  </Example>
)

export const StackedBarChartShowValues = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} showValues />
  </Example>
)

export const StackedBarChartTwoColumns = () => (
  <Example>
    <StackedBarChart groups={withTwoColumnsData.groups} showValues />
  </Example>
)

export const StackedBarChartTicks = () => (
  <Example>
    <StackedBarChart
      groups={interactiveData.groups}
      showValues
      formatValueForLabel={v => `${v} %`}
    />
  </Example>
)

export const StackedBarChartTicks2 = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} showValues />
  </Example>
)

export const StackedBarChartTooltip = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      showValues
      formatValueForLabel={v => `${v} тыс.`}
      formatValueForTooltip={v => `${v} тысяч`}
    />
  </Example>
)

export const StackedBarChartExampleThreshold = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      showValues
      threshold={interactiveData.threshold}
    />
  </Example>
)

export const StackedBarChartExampleM = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={true} />
  </Example>
)

export const StackedBarChartExampleHorizontal = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} />
  </Example>
)

export const StackedBarChartUnits = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" />
  </Example>
)

export const StackedBarChartExampleFrameControlShowAll = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      unit="тыс. тонн"
      showGrid={true}
      showGroupsLabels={true}
      showGuide={true}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideGrid = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      unit="тыс. тонн"
      showGrid={false}
      showGroupsLabels={true}
      showGuide={true}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideLineAtZero = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      unit="тыс."
      showGrid={true}
      showGroupsLabels={true}
      showGuide={false}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideLabels = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      unit="тыс."
      showGrid={true}
      showGroupsLabels={false}
      showGuide={true}
    />
  </Example>
)

export const StackedBarChartExampleMaxY = () => (
  <Example>
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс." max={1300} />
  </Example>
)
