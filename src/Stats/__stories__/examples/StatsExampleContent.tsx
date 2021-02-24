import React from 'react'

import { IconLightningBolt } from '@consta/uikit/IconLightningBolt'

import { Example } from '@/__private__/storybook'

import { Stats } from '../..'
import { exampleData } from '../../__mocks__/examples.mock'

export const StatsExampleContent = () => (
  <Example width="200px">
    <Stats {...exampleData} />
  </Example>
)

export const StatsExampleContentLong = () => (
  <Example width="180px">
    <Stats
      {...exampleData}
      title="Молний за год произошло в Роcсии"
      iconTitle={IconLightningBolt}
      unit="дополнительный комментарий"
    />
  </Example>
)
