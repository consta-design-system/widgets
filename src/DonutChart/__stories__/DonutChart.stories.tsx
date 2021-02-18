import React from 'react'

import { object, select } from '@storybook/addon-knobs'

import { halvesDonut } from '@/__private__/components/CoreDonutChart/CoreDonutChartPie/CoreDonutChartPie'
import {
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  optionalSelect,
} from '@/__private__/storybook'
import { FormatValue } from '@/__private__/types'

import { DonutChart } from '..'
import { donutData } from '../__mocks__/data.mock'

import mdx from './DonutChart.mdx'

const formattersKeysForTooltip = ['Кубических метров', 'Без форматирования'] as const
const formatsValueForTooltip: Record<typeof formattersKeysForTooltip[number], FormatValue> = {
  'Кубических метров': cubeMeterFormatValue,
  'Без форматирования': String,
}

const getKnobs = () => {
  return {
    data: object('data', donutData.data),
    textData: object('textData', {
      value: '',
      title: '',
      subValue: '',
      subTitle: '',
    }),
    halfDonut: optionalSelect('halfDonut', halvesDonut, undefined),
    formatValueForTooltip:
      formatsValueForTooltip[
        select('formatValueForTooltip', formattersKeysForTooltip, formattersKeysForTooltip[0])
      ],
  }
}

export const Interactive = createStory(() => <DonutChart {...getKnobs()} />)

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
