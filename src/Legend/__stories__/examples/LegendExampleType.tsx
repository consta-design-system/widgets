import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../../Legend'

export const LegendExampleType = () => (
  <Example>
    <Legend
      direction="column"
      type="dot"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер dot',
        },
      ]}
      size="s"
      labelPosition="left"
    />
    <Legend
      direction="column"
      type="line"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер line',
        },
      ]}
      size="s"
      labelPosition="left"
    />
    <Legend
      direction="column"
      type="warning"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер warning',
        },
      ]}
      size="s"
      labelPosition="left"
    />
  </Example>
)

export const LegendExampleTypeLine = () => (
  <Example>
    <Legend
      direction="column"
      type="line"
      items={[
        {
          color: 'var(--color-bg-success)',
          text: 'Маркер line',
        },
      ]}
      size="s"
      labelPosition="left"
    />
    <Legend
      direction="column"
      type="lineBold"
      items={[
        {
          color: 'var(--color-bg-success',
          text: 'Маркер с lineBold',
        },
      ]}
      size="s"
      labelPosition="left"
    />
    <Legend
      direction="column"
      type="line"
      labelPosition="top"
      items={[
        {
          color: 'var(--color-bg-success)',
          text: 'Маркер в позиции top',
        },
      ]}
      size="s"
    />
  </Example>
)
