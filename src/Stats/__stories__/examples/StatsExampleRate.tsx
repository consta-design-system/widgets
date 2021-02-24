import React from 'react'

import { Example } from '@/__private__/storybook'

import { Stats } from '../..'
import { exampleData } from '../../__mocks__/examples.mock'

export const StatsExampleRateUp = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="20%" iconArrowRate="up" />
  </Example>
)

export const StatsExampleRateDown = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="20%" iconArrowRate="down" status="error" />
  </Example>
)

export const StatsExampleRateAutoPositive = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="+20%" iconArrowRate="auto" />
  </Example>
)

export const StatsExampleRateAutoNegative = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="-20%" status="error" iconArrowRate="auto" />
  </Example>
)
