import React from 'react'

import { Example } from '@/__private__/storybook'

import { BarChart } from '../..'
import { groupExampleData, minimalData, withNegativeValueData } from '../../data.mock'

export const BarChartExampleGeneral = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={withNegativeValueData.colors}
      groups={withNegativeValueData.groups}
      isHorizontal={true}
      showValues={true}
    />
  </Example>
)

export const BarChartExampleSizeS = () => (
  <Example width="300px">
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
    />
  </Example>
)

export const BarChartExampleSizeM = () => (
  <Example width="300px">
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
    />
  </Example>
)

export const BarChartExampleSizeAuto = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
    />
  </Example>
)

export const BarChartExampleNotHorizontal = () => (
  <Example width="300px">
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={false}
      showValues={true}
      threshold={minimalData.threshold}
    />
  </Example>
)

export const BarChartExampleUnitLeft = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
      unit="тыс. тонн"
      unitPosition="left"
    />
  </Example>
)

export const BarChartExampleUnitBottom = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
      unit="тыс. тонн"
      unitPosition="bottom"
    />
  </Example>
)

export const BarChartExampleUnitLeftBottom = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
      unit="тыс. тонн"
      unitPosition="left-and-bottom"
    />
  </Example>
)

export const BarChartExampleUnitNone = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
      unit="тыс. тонн"
      unitPosition="none"
    />
  </Example>
)

export const BarChartExampleThreshold = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={true}
      showValues={true}
      threshold={minimalData.threshold}
    />
  </Example>
)

export const BarChartExampleGroup = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal={true}
      unit="тыс. тонн"
      unitPosition="none"
    />
  </Example>
)

export const BarChartExampleGroupSlanted = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal={false}
      unit="тыс. тонн"
      unitPosition="none"
      isXAxisLabelsSlanted
    />
  </Example>
)

export const BarChartExampleShowValues = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal={true}
      unit="тыс. тонн"
      unitPosition="none"
      showValues={true}
    />
  </Example>
)

export const BarChartExampleLableProcent = () => (
  <Example>
    <BarChart
      formatValueForLabel={v => `${v}%`}
      formatValueForTooltip={v => `${v}%`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal={true}
      unit="тыс. тонн"
      unitPosition="none"
      showValues={true}
    />
  </Example>
)

export const BarChartExampleGrid = () => (
  <Example>
    <BarChart
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={true}
      unit="тыс. тонн"
      unitPosition="none"
      showValues={true}
    />
  </Example>
)
