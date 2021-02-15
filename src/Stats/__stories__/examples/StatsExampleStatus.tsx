import React from 'react'

import { Example } from '@/__private__/storybook'

import { Stats } from '../..'
import { exampleData } from '../../__mocks__/examples.mock'

export const StatsExampleSuccess = () => (
  <Example>
    <Stats {...exampleData} size="2xs" />
  </Example>
)

export const StatsExampleWarning = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="warning" />
  </Example>
)

export const StatsExampleError = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="error" />
  </Example>
)

export const StatsExampleSystem = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="system" />
  </Example>
)
