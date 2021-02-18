import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../..'

export const LegendExampleSize = () => (
  <Example>
    <Legend
      size="xs"
      direction="column"
      data={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись XS',
        },
      ]}
      labelType="dot"
      labelPosition="left"
    />
    <Legend
      size="s"
      direction="column"
      data={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись S',
        },
      ]}
      labelType="dot"
      labelPosition="left"
    />
    <Legend
      size="m"
      direction="column"
      data={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись M',
        },
      ]}
      labelType="dot"
      labelPosition="left"
    />
  </Example>
)
