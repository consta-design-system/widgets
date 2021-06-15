import React from 'react'

import { Example } from '@/__private__/storybook'

import { DonutChart } from '../..'
import {
  donutData,
  donutDataItemsWithZeroAndPositiveData,
  donutDataItemsWithZeroData,
  donutProgressData,
} from '../../__mocks__/data.mock'

export const DonutChartExample = () => (
  <Example height="200px">
    <DonutChart data={donutData.data} formatValueForTooltip={v => `${v}%`} />
  </Example>
)

export const DonutChartExampleSums = () => (
  <Example height="200px">
    <DonutChart data={donutData.data} formatValueForTooltip={v => `${v}%`} sums={[10, 20, 30]} />
  </Example>
)

export const DonutChartZero = () => (
  <Example height="200px">
    <DonutChart
      data={[
        {
          name: 'Нулевой бур',
          color: 'var(--color-bg-alert)',
          values: [0],
        },
      ]}
    />
  </Example>
)

export const DonutChartZero3 = () => (
  <Example height="200px">
    <DonutChart data={donutDataItemsWithZeroData.data} />
  </Example>
)

export const DonutChartZeroPositive = () => (
  <Example height="200px">
    <DonutChart data={donutDataItemsWithZeroAndPositiveData.data} />
  </Example>
)

export const DonutChartData4 = () => (
  <Example height="200px">
    <DonutChart
      data={[
        {
          name: 'Северный бур',
          color: 'var(--color-bg-alert)',
          values: [1, 2, 3],
        },
        {
          name: 'Южный бур',
          color: 'var(--color-bg-caution)',
          values: [4, 5, 6],
        },
        {
          name: 'Западный бур',
          color: 'var(--color-bg-normal)',
          values: [7, 8, 9],
        },
        {
          name: 'Неизвестный бур',
          color: '#9F0CE9',
          values: [null, 0, 8],
        },
      ]}
    />
  </Example>
)

export const DonutChartData40 = () => (
  <Example height="200px">
    <DonutChart
      data={[
        {
          name: 'Северный бур',
          color: 'var(--color-bg-alert)',
          values: [1, 2, 3],
        },
        {
          name: 'Южный бур',
          color: 'var(--color-bg-caution)',
          values: [4, 5, 6],
        },
        {
          name: 'Западный бур',
          color: 'var(--color-bg-normal)',
          values: [7, 8, 9],
        },
        {
          name: 'Неизвестный бур',
          color: '#9F0CE9',
          values: [null, null, null],
        },
      ]}
    />
  </Example>
)

export const DonutChartText = () => (
  <Example height="200px">
    <DonutChart data={donutProgressData.data} value="90" label="всего" />
  </Example>
)

export const DonutChartTextTop = () => (
  <Example height="200px">
    <DonutChart data={donutProgressData.data} value="90" label="всего" halfDonut="top" />
  </Example>
)

export const DonutChartTextRight = () => (
  <Example height="200px">
    <DonutChart data={donutProgressData.data} value="90" label="всего" halfDonut="right" />
  </Example>
)

export const DonutChartTooltip = () => (
  <Example>
    <DonutChart data={donutData.data} halfDonut="top" formatValueForTooltip={v => `${v} км`} />
  </Example>
)

export const DonutChartHalfDonutTop = () => (
  <Example>
    <DonutChart data={donutData.data} halfDonut="top" />
  </Example>
)

export const DonutChartHalfDonutBottom = () => (
  <Example>
    <DonutChart data={donutData.data} halfDonut="bottom" />
  </Example>
)

export const DonutChartHalfDonutLeft = () => (
  <Example height="200px">
    <DonutChart data={donutData.data} halfDonut="left" />
  </Example>
)

export const DonutChartHalfDonutRight = () => (
  <Example height="200px">
    <DonutChart data={donutData.data} halfDonut="right" />
  </Example>
)

export const DonutChartLegendTop = () => (
  <Example width="200" height="300px">
    <DonutChart data={donutData.data} legendPosition="top" />
  </Example>
)

export const DonutChartLegendRight = () => (
  <Example width="400px" height="200">
    <DonutChart data={donutData.data} legendPosition="right" />
  </Example>
)

export const DonutChartLegendBottom = () => (
  <Example width="200" height="300px">
    <DonutChart data={donutData.data} legendPosition="bottom" />
  </Example>
)

export const DonutChartLegendLeft = () => (
  <Example width="400px" height="200">
    <DonutChart data={donutData.data} legendPosition="left" />
  </Example>
)

export const DonutChartWithArcLabels = () => (
  <Example height="200px">
    <DonutChart
      data={[
        {
          name: 'Северный бур',
          color: 'var(--color-bg-alert)',
          values: [1],
        },
        {
          name: 'Южный бур',
          color: 'var(--color-bg-caution)',
          values: [4],
        },
        {
          name: 'Западный бур',
          color: 'var(--color-bg-normal)',
          values: [7],
        },
      ]}
      showArcLabels
    />
  </Example>
)
