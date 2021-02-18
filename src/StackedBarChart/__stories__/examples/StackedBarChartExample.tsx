import React from 'react'

import { Example } from '@/__private__/storybook'
import { interactiveData, withTwoColumnsData } from '@/StackedBarChart/data.mock'
import { StackedBarChart } from '@/StackedBarChart/StackedBarChart'

export const MultiBarChartExampleMin = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} />
  </Example>
)

export const MultiBarChartExampleSlanted = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} isXAxisLabelsSlanted />
  </Example>
)

export const MultiBarChartShowValues = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} showValues />
  </Example>
)

export const MultiBarChartTwoColumns = () => (
  <Example>
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={false} showValues />
  </Example>
)

export const MultiBarChartTicks = () => (
  <Example>
    <StackedBarChart
      groups={interactiveData.groups}
      isHorizontal={false}
      showValues
      formatValueForLabel={v => `${v} %`}
    />
  </Example>
)

export const MultiBarChartTicks2 = () => (
  <Example>
    <StackedBarChart groups={interactiveData.groups} isHorizontal={false} showValues />
  </Example>
)

export const MultiBarChartTooltip = () => (
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

export const MultiBarChartExampleThreshold = () => (
  <Example>
    <StackedBarChart
      groups={withTwoColumnsData.groups}
      isHorizontal={false}
      showValues
      threshold={interactiveData.threshold}
    />
  </Example>
)

export const MultiBarChartExampleS = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={true} />
  </Example>
)

export const MultiBarChartExampleM = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={true} />
  </Example>
)

export const MultiBarChartExampleHorizontal = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} />
  </Example>
)

export const MultiBarChartUnitsLeft = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" />
  </Example>
)

export const MultiBarChartUnitsBottom = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" />
  </Example>
)

export const MultiBarChartUnitsLeftBottom = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" />
  </Example>
)

export const MultiBarChartUnitsNone = () => (
  <Example width="300px">
    <StackedBarChart groups={withTwoColumnsData.groups} unit="тыс. м" />
  </Example>
)

export const MultiBarChartExampleScroll = () => (
  <Example height="50px">
    <StackedBarChart groups={withTwoColumnsData.groups} isHorizontal={true} withScroll={true} />
  </Example>
)
