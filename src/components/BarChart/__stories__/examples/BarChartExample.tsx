import React from 'react';

import { BarChart } from '##/components/BarChart';
import { Example } from '##/storybook';

import {
  groupExampleData,
  groupExampleDataOverflow,
  minimalData,
  withNegativeValueData,
} from '../../data.mock';

export const BarChartExampleGeneral = () => (
  <Example height="400px">
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={withNegativeValueData.colors}
      groups={withNegativeValueData.groups}
      isHorizontal
      showValues
    />
  </Example>
);

export const BarChartExampleHorizontal = () => (
  <Example width="300px">
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal
      showValues
      threshold={minimalData.threshold}
    />
  </Example>
);

export const BarChartExampleUnit = () => (
  <Example>
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      showValues
      threshold={minimalData.threshold}
      unit="тыс. тонн"
    />
  </Example>
);

export const BarChartExampleUnitNone = () => (
  <Example>
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      isHorizontal
      showValues
      threshold={minimalData.threshold}
      unit="тыс. тонн"
    />
  </Example>
);

export const BarChartExampleThreshold = () => (
  <Example>
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={minimalData.colors}
      groups={minimalData.groups}
      showValues
      threshold={minimalData.threshold}
    />
  </Example>
);

export const BarChartExampleGroup = () => (
  <Example height="300px">
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal
      unit="тыс. тонн"
    />
  </Example>
);

export const BarChartExampleGroupSlanted = () => (
  <Example>
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal={false}
      unit="тыс. тонн"
      isXAxisLabelsSlanted
    />
  </Example>
);

export const BarChartExampleShowValues = () => (
  <Example height="300px">
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      isHorizontal
      unit="тыс. тонн"
      showValues
    />
  </Example>
);

export const BarChartExampleOverflow = () => (
  <Example height="300px">
    <BarChart
      formatValueForTooltip={(v) => `${v} км`}
      colors={groupExampleDataOverflow.colors}
      groups={groupExampleDataOverflow.groups}
      isHorizontal
      unit="тыс. тонн"
      showValues
    />
  </Example>
);

export const BarChartExampleLableProcent = () => (
  <Example height="300px">
    <BarChart
      formatValueForLabel={(v) => `${v}%`}
      formatValueForTooltip={(v) => `${v}%`}
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      showValues
      showGrid
      showGuide
    />
  </Example>
);

export const BarChartExampleGrid = () => (
  <Example>
    <BarChart
      colors={groupExampleData.colors}
      groups={groupExampleData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal
      unit="тыс. тонн"
      showValues
    />
  </Example>
);

export const BarChartExampleFrameControlShowAll = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid
      showGroupsLabels
      showGuide
    />
  </Example>
);

export const BarChartExampleFrameControlHideGrid = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid={false}
      showGroupsLabels
      showGuide
    />
  </Example>
);

export const BarChartExampleFrameControlHideLineAtZero = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid
      showGroupsLabels
      showGuide={false}
    />
  </Example>
);

export const BarChartExampleFrameControlHideLabels = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      showGrid
      showGroupsLabels={false}
      showGuide
    />
  </Example>
);

export const BarChartExampleMinMaxY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      min={-500}
      max={1200}
    />
  </Example>
);

export const BarChartExampleMinY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      min={-500}
    />
  </Example>
);

export const BarChartExampleMaxY = () => (
  <Example>
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      formatValueForTooltip={(v) => `${v}%`}
      isHorizontal={false}
      unit="тыс. тонн"
      max={1300}
    />
  </Example>
);
