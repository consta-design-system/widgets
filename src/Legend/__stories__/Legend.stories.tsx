import React from 'react'

import { boolean, object, select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'
import { labelPositions, labelSizes, labelTypes } from '@/LegendItem/helpers'

import { Legend } from '..'
import { legendDirections } from '../helpers'
import { interactiveData } from '../__mocks__/data.mock'

import mdx from './Legend.mdx'

const getKnobs = () => {
  return {
    data: object('data', interactiveData),
    direction: select('direction', legendDirections, legendDirections[0]),
    labelType: select('labelType', labelTypes, labelTypes[0]),
    size: select('size', labelSizes, labelSizes[1]),
    labelPosition: select('labelPosition', labelPositions, labelPositions[1]),
    lineBold: boolean('lineBold', false),
    title: text('title', ''),
  }
}

export const Interactive = createStory(() => <Legend {...getKnobs()} />)

export default createMetadata({
  title: 'Компоненты|/Legend',
  id: 'components/Legend',
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
