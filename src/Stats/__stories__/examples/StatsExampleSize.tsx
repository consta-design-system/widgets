import React from 'react'

import { Example } from '@/__private__/storybook'

import { Stats } from '../..'
import { exampleData } from '../../__mocks__/examples.mock'

export const StatsExampleSize2XS = () => (
  <Example>
    <Stats {...exampleData} size="2xs" />
  </Example>
)

export const StatsExampleSizeXS = () => (
  <Example>
    <Stats {...exampleData} size="xs" />
  </Example>
)

export const StatsExampleSizeS = () => (
  <Example>
    <Stats {...exampleData} size="s" />
  </Example>
)

export const StatsExampleSizeM = () => (
  <Example>
    <Stats {...exampleData} size="m" />
  </Example>
)

export const StatsExampleSizeL = () => (
  <Example>
    <Stats {...exampleData} size="l" />
  </Example>
)
