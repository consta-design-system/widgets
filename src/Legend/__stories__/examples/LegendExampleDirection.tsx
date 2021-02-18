import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../..'

const data = [
  {
    color: 'var(--color-bg-alert)',
    text: 'Пункт раз',
  },
  {
    color: 'var(--color-bg-warning)',
    text: 'Пункт два',
  },
  {
    color: 'var(--color-bg-success)',
    text: 'Пункт три',
  },
] as const

export const LegendExampleDirectionRow = () => (
  <Example>
    <Legend direction="row" data={data} labelType="dot" size="s" labelPosition="left" />
  </Example>
)

export const LegendExampleDirectionColumn = () => (
  <Example>
    <Legend direction="column" data={data} labelType="dot" size="s" labelPosition="left" />
  </Example>
)
