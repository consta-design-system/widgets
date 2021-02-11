import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../../Legend'

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
    <Legend direction="row" items={data} type="dot" size="s" labelPosition="left" />
  </Example>
)

export const LegendExampleDirectionColumn = () => (
  <Example>
    <Legend direction="column" items={data} type="dot" size="s" labelPosition="left" />
  </Example>
)
