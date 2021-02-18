import React from 'react'

import { boolean, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'

import { labelPositions, labelSizes, labelTypes } from '../helpers'
import { LegendItem } from '../LegendItem'

import mdx from './LegendItem.mdx'

const getKnobs = () => {
  return {
    children: text('children', 'Тестовый текст'),
    color: text('color', 'red'),
    type: select('type', labelTypes, labelTypes[0]),
    fontSize: select('fontSize', labelSizes, labelSizes[1]),
    position: select('position', labelPositions, labelPositions[1]),
    isLineBold: boolean('isLineBold', false),
    shouldCropText: boolean('shouldCropText', false),
  }
}

export const Interactive = createStory(() => <LegendItem {...getKnobs()} />)

export default createMetadata({
  title: 'Компоненты|/LegendItem',
  id: 'components/LegendItem',
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
