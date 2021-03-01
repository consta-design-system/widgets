import React from 'react'

import { object, select } from '@storybook/addon-knobs'

import { defaultSortValue, SortValue } from '@/__private__/components/CoreDonutChart/helpers'
import { halvesDonut } from '@/__private__/components/CoreDonutChart/CoreDonutChartPie/CoreDonutChartPie'
import {
  createMetadata,
  createStory,
  cubeMeterFormatValue,
  optionalSelect,
} from '@/__private__/storybook'
import { FormatValue } from '@/__private__/types'

import { DonutChart } from '..'
import { legendPositions } from '../helpers'
import { donutData } from '../__mocks__/data.mock'

import mdx from './DonutChart.mdx'

const formattersKeysForTooltip = ['Кубических метров', 'Без форматирования'] as const
const formatsValueForTooltip: Record<typeof formattersKeysForTooltip[number], FormatValue> = {
  'Кубических метров': cubeMeterFormatValue,
  'Без форматирования': String,
}

const sortsValueKey = ['Как пришли', 'От большего к меньшему'] as const
const sortsValue: Record<typeof sortsValueKey[number], SortValue | null> = {
  'От большего к меньшему': defaultSortValue,
  'Как пришли': null,
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
    sums: object('sums', []),
    legendPosition: optionalSelect('legendPosition', legendPositions, undefined),
    formatValueForTooltip:
      formatsValueForTooltip[
        select('formatValueForTooltip', formattersKeysForTooltip, formattersKeysForTooltip[0])
      ],
    sortValue: sortsValue[select('sortValue', sortsValueKey, sortsValueKey[0])],
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
