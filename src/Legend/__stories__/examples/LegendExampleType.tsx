import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../..'

export const LegendExampleType = () => (
  <Example>
    <Legend
      direction="column"
      labelType="dot"
      data={[
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
      labelType="line"
      data={[
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
      labelType="warning"
      data={[
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
      labelType="line"
      data={[
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
      labelType="line"
      lineBold
      data={[
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
      labelType="line"
      labelPosition="top"
      data={[
        {
          color: 'var(--color-bg-success)',
          text: 'Маркер в позиции top',
        },
      ]}
      size="s"
    />
  </Example>
)
