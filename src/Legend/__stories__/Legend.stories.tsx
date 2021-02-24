import React from 'react'

import { Text } from '@consta/uikit/Text'
import { action } from '@storybook/addon-actions'
import { object, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'
import { labelPositions, labelTypes, sizes } from '@/LegendItem/LegendItem'
import { LinearChart } from '@/LinearChart/LinearChart'

import { interactiveData, withChart } from '../data.mock'
import { directions, Legend } from '../Legend'

import mdx from './Legend.mdx'

const getCommonProps = () =>
  ({
    direction: select('direction', directions, 'column'),
    labelPosition: select('labelPosition', labelPositions, labelPositions[1]),
    type: select('type', labelTypes, labelTypes[0]),
    size: select('size', sizes, sizes[1]),
  } as const)

export const Interactive = createStory(
  () => <Legend {...getCommonProps()} items={object('data', interactiveData)} />,
  {
    parameters: {
      environment: {
        style: {
          width: 200,
        },
      },
    },
  }
)

export const WithChart = createStory(
  () => (
    <>
      <div style={{ height: 200, marginBottom: 'var(--space-m)' }}>
        <LinearChart {...withChart.linearChartProps} />
      </div>
      <div style={{ display: 'inline-block' }}>
        <Legend
          {...getCommonProps()}
          items={object('data', withChart.data)}
          onItemMouseEnter={action('onItemMouseEnter')}
          onItemMouseLeave={action('onItemMouseLeave')}
        />
      </div>
    </>
  ),
  {
    name: 'с графиком',
    parameters: {
      environment: {
        style: {
          width: 400,
        },
      },
    },
  }
)

export const WithTitle = createStory(
  () => (
    <Legend
      {...getCommonProps()}
      items={object('data', interactiveData)}
      title={
        <Text as="div" view="primary" size="m">
          {text('title', 'Заголовок')}
        </Text>
      }
    />
  ),
  {
    name: 'с заголовком',
  }
)

export default createMetadata({
  title: 'Компоненты|/Legend',
  id: 'components/Legend',
  parameters: {
    docs: {
      page: mdx,
    },
  },
})
