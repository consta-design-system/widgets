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
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} isXAxisLabelsSlanted />
  </Example>
)

export const StackedBarChartShowValues = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} showValues />
  </Example>
)

export const StackedBarChartTwoColumns = () => (
  <Example>
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={false} showValues />
  </Example>
)

export const StackedBarChartTicks = () => (
  <Example>
    <StackedBarChart
      groups={interactiveData.groups}
      isHorizontal={false}
      showValues
      formatValueForLabel={v => `${v} %`}
    />
  </Example>
)

export const StackedBarChartTicks2 = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} showValues />
  </Example>
)

export const StackedBarChartTooltip = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
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
      isHorizontal={false}
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

export const StackedBarChartUnitsLeft = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" isHorizontal={false} />
  </Example>
)

export const StackedBarChartUnitsBottom = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" isHorizontal={true} />
  </Example>
)

export const StackedBarChartExampleFrameControlShowAll = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={true}
      showGroupsLabels={true}
      showLineAtZero={true}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideGrid = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={false}
      showGroupsLabels={true}
      showLineAtZero={true}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideLineAtZero = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      unit="тыс."
      showGrid={true}
      showGroupsLabels={true}
      showLineAtZero={false}
    />
  </Example>
)

export const StackedBarChartExampleFrameControlHideLabels = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      unit="тыс."
      showGrid={true}
      showGroupsLabels={false}
      showLineAtZero={true}
    />
  </Example>
)

export const StackedBarChartExampleMaxY = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      unit="тыс."
      maxValueY={1300}
    />
  </Example>
)
