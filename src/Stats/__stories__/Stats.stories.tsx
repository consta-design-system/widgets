import React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'

import { Stats } from '..'

import mdx from './Stats.mdx'

export const Interactive = createStory(() => (
  <Stats title="Сроки" value={217} numberBadge={20} unit="суток" size="xs" layout="default" />
))

export const WithLineBreak = createStory(() => (
  <Stats
    title="Сроки срочные сроки срочные сроки срочные"
    value={217000}
    numberBadge={20}
    unit="суток / час / суток / час / суток / час"
    size="xs"
    layout="default"
  />
))

export default createMetadata({
  title: 'Компоненты|/Stats',
  id: 'components/Stats',
  decorators: [withSmartKnobs()],
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
