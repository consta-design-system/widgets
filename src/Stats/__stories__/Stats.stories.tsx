import React from 'react'

import { IconLightningBolt } from '@consta/uikit/IconLightningBolt'
import { number, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, optionalSelect } from '@/__private__/storybook'
import { FormatValue } from '@/__private__/types'
import { numberFormatter } from '@/__private__/utils/formatters'

import { Stats } from '..'
import { FormatRate, iconsArrowRate, IconTitle, layouts, sizes, statuses } from '../helpers'

import mdx from './Stats.mdx'

const iconsTitleKeys = ['Без иконки', 'IconLightningBolt'] as const
const iconsTitle: Record<typeof iconsTitleKeys[number], IconTitle | undefined> = {
  'Без иконки': undefined,
  IconLightningBolt,
}

const formattersKeys = ['По умолчанию', 'Без форматирования'] as const
const formatsValue: Record<typeof formattersKeys[number], FormatValue> = {
  'По умолчанию': numberFormatter,
  'Без форматирования': String,
}
const formatsRate: Record<typeof formattersKeys[number], FormatRate> = {
  'По умолчанию': numberFormatter,
  'Без форматирования': String,
}

const getKnobs = () => {
  return {
    value: number('value', 2170),
    placeholder: text('placeholder', '—'),
    title: text('title', 'Молний за год'),
    iconTitle: iconsTitle[select('iconTitle', iconsTitleKeys, iconsTitleKeys[0])],
    unit: text('unit', 'разрядов'),
    rate: text('rate', '20%'),
    iconArrowRate: optionalSelect('iconArrowRate', iconsArrowRate),
    status: select('status', statuses, statuses[0]),
    layout: select('layout', layouts, layouts[0]),
    size: select('size', sizes, sizes[3]),
    formatValue: formatsValue[select('formatValue', formattersKeys, formattersKeys[0])],
    formatRate: formatsRate[select('formatRate', formattersKeys, formattersKeys[0])],
  }
}

export const Interactive = createStory(() => <Stats {...getKnobs()} />)

export default createMetadata({
  title: 'Компоненты|/Stats',
  id: 'components/Stats',
  parameters: {
    docs: {
      page: mdx,
    },
    environment: {
      style: {
        width: 200,
      },
    },
  },
})
