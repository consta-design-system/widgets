import React from 'react'

import { Example } from '@/__private__/storybook'
import { BarChart } from '@/BarChart'

import {
  groupExampleData,
  groupExampleDataOverflow,
  minimalData,
  withNegativeValueData,
} from '../../data.mock'

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
    />
  </Example>
)

export const BarChartExampleUnitBottom = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal={false}
      showValues={true}
      threshold={minimalData.threshold}
      unit="тыс. тонн"
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
      showValues={true}
    />
  </Example>
)

export const BarChartExampleOverflow = () => (
  <Example>
    <BarChart
      formatValueForTooltip={v => `${v} км`}
      colors={groupExampleDataOverflow.colors}
      groups={groupExampleDataOverflow.groups}
      isHorizontal={true}
      unit="тыс. тонн"
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
      showValues={true}
    />
  </Example>
)

export const BarChartExampleFrameControlShowAll = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={true}
      showGroupsLabels={true}
      showGuide={true}
    />
  </Example>
)

export const BarChartExampleFrameControlHideGrid = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={false}
      showGroupsLabels={true}
      showGuide={true}
    />
  </Example>
)

export const BarChartExampleFrameControlHideLineAtZero = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={true}
      showGroupsLabels={true}
      showGuide={false}
    />
  </Example>
)

export const BarChartExampleFrameControlHideLabels = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={true}
      showGroupsLabels={false}
      showGuide={true}
    />
  </Example>
)

export const BarChartExampleMinMaxY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      min={-500}
      max={1200}
    />
  </Example>
)

export const BarChartExampleMinY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      min={-500}
    />
  </Example>
)

export const BarChartExampleMaxY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={v => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      max={1300}
    />
  </Example>
)
