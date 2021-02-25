import React from 'react'

import { boolean, object, select, text } from '@storybook/addon-knobs'

import {
  defaultFormatArcLabel,
  defaultSortValue,
  FormatArcLabel,
  SortValue,
} from '@/__private__/components/CoreDonutChart/helpers'
import { halvesDonut } from '@/__private__/components/CoreDonutChart/helpers'
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

const formattersKeysArcLabel = ['По умолчанию', 'Значения'] as const
const formattersArcLabel: Record<typeof formattersKeysArcLabel[number], FormatArcLabel> = {
  'По умолчанию': defaultFormatArcLabel,
  Значения: item => String(item.value),
}

const sortsValueKey = ['Как пришли', 'От большего к меньшему'] as const
const sortsValue: Record<typeof sortsValueKey[number], SortValue | null> = {
  'От большего к меньшему': defaultSortValue,
  'Как пришли': null,
}

const getKnobs = () => {
  return {
    data: object('data', donutData.data),
    value: text('value', '122'),
    label: text('label', 'км'),
    halfDonut: optionalSelect('halfDonut', halvesDonut, undefined),
    sums: object('sums', []),
    legendPosition: optionalSelect('legendPosition', legendPositions, undefined),
    showArcLabels: boolean('showArcLabels', false),
    formatValueForTooltip:
      formatsValueForTooltip[
        select('formatValueForTooltip', formattersKeysForTooltip, formattersKeysForTooltip[0])
      ],
    formatArcLabel:
      formattersArcLabel[
        select('formatArcLabel', formattersKeysArcLabel, formattersKeysArcLabel[0])
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
