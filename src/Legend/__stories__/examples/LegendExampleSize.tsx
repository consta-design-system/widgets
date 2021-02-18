import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../../Legend'

export const LegendExampleSize = () => (
  <Example>
    <Legend
      size="xs"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись XS',
        },
      ]}
      type="dot"
      labelPosition="left"
    />
    <Legend
      size="s"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись S',
        },
      ]}
      type="dot"
      labelPosition="left"
    />
    <Legend
      size="m"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись M',
        },
      ]}
      type="dot"
      labelPosition="left"
    />
  </Example>
)
