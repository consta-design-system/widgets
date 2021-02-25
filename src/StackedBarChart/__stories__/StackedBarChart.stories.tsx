import React from 'react'

import { object, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'
import { StackedBarChart } from '@/StackedBarChart/StackedBarChart'

import { interactiveData, withPercentColumnsData, withTwoColumnsData } from '../data.mock'

import docs from './StackedBarChart.mdx'

const getCommonProps = (initialUnit: string) => {
  const unit = text('unit', initialUnit)

  return {
    unit,
    isHorizontal: false,
    showLineAtZero: true,
    showGroupsLabels: true,
    showGrid: true,
    formatValueForTooltip: (v: number) => `${v} ${unit}`,
  } as const
}

export const Interactive = createStory(
  () => (
    <StackedBarChart {...getCommonProps(interactiveData.unit)} groups={interactiveData.groups} />
  ),
  { name: 'с одним столбцом' }
)

export const WithTwoColumns = createStory(
  () => (
    <StackedBarChart
      {...getCommonProps(withTwoColumnsData.unit)}
      groups={withTwoColumnsData.groups}
    />
  ),
  { name: 'с двумя столбцами' }
)

export const HasRatio = createStory(
  () => (
    <StackedBarChart
      {...getCommonProps(withTwoColumnsData.unit)}
      groups={withPercentColumnsData.groups}
      formatValueForLabel={v => `${v}%`}
    />
  ),
  { name: 'в процентах' }
)

export const Minimalistic = createStory(
  () => (
    <StackedBarChart
      {...getCommonProps(interactiveData.unit)}
      groups={interactiveData.groups}
      isHorizontal={true}
    />
  ),
  { name: 'минималистичный' }
)

export const WithThreshold = createStory(
  () => (
    <StackedBarChart
      {...getCommonProps(interactiveData.unit)}
      groups={interactiveData.groups}
      threshold={object('threshold', interactiveData.threshold)}
    />
  ),
  { name: 'с предельным значением' }
)

export default createMetadata({
  title: 'Компоненты|/StackedBarChart',
  id: 'components/StackedBarChart',
  decorators: [withSmartKnobs()],
  parameters: {
    docs: {
      page: docs,
    },
    environment: { style: { width: '60vw', height: '80vh' } },
  },
})
