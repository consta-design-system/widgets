import React from 'react'

import { boolean, object, text } from '@storybook/addon-knobs'

import {
  ArcDataItem,
  defaultFormatArcLabel,
  defaultSortValue,
} from '@/__private__/components/CoreDonutChart/helpers'
import { halvesDonut } from '@/__private__/components/CoreDonutChart/helpers'
import {
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  optionalSelect,
} from '@/__private__/storybook'

import { DonutChart } from '..'
import { legendPositions } from '../helpers'
import { donutData, donutOneCircleData } from '../__mocks__/data.mock'

import mdx from './DonutChart.mdx'

type Props = React.ComponentProps<typeof DonutChart>

const getKnobs = (props: Partial<Props> = {}) => {
  return {
    data: object('data', props.data || donutData.data),
    value: text('value', props.value || ''),
    label: text('label', props.label || ''),
    halfDonut: optionalSelect('halfDonut', halvesDonut, props.halfDonut),
    sums: object('sums', props.sums || []),
    legendPosition: optionalSelect('legendPosition', legendPositions, props.legendPosition),
    showArcLabels: boolean('showArcLabels', props.showArcLabels ?? false),
    formatValueForTooltip: boolean('formatValueForTooltip', true) ? cubeMeterFormatValue : String,
    formatArcLabel: boolean('formatArcLabel', true)
      ? defaultFormatArcLabel
      : (item: ArcDataItem) => String(item.value),
    sortValue: boolean('sortValue', true) ? defaultSortValue : null,
  }
}

export const Interactive = createStory(() => <DonutChart {...getKnobs()} />)

export const OneCircleWithoutLegend = createStory(
  () => <DonutChart {...getKnobs({ data: donutOneCircleData })} />,
  {
    name: 'Один круг без легенды',
    parameters: {
      environment: {
        style: {
          width: 200,
          height: 200,
        },
      },
    },
  }
)

export const OneCircleWithLegend = createStory(
  () => <DonutChart {...getKnobs({ data: donutOneCircleData, legendPosition: 'right' })} />,
  {
    name: 'Один круг с легендой',
    parameters: {
      environment: {
        style: {
          width: 400,
          height: 400,
        },
      },
    },
  }
)

export const OneCircleWithText = createStory(
  () => <DonutChart {...getKnobs({ data: donutOneCircleData, value: '122', label: 'км' })} />,
  {
    name: 'Один круг с текстом в центре',
    parameters: {
      environment: {
        style: {
          width: 200,
          height: 200,
        },
      },
    },
  }
)

export const OneCircleWithArcsLabels = createStory(
  () => <DonutChart {...getKnobs({ data: donutOneCircleData, showArcLabels: true })} />,
  {
    name: 'Один круг с подписями',
    parameters: {
      environment: {
        style: {
          width: 400,
          height: 200,
        },
      },
    },
  }
)

export default createMetadata({
  title: 'Компоненты|/DonutChart',
  id: 'components/DonutChart',
  parameters: {
    docs: {
      page: mdx,
    },
    environment: {
      style: {
        width: 200,
        height: 200,
      },
    },
  },
})
