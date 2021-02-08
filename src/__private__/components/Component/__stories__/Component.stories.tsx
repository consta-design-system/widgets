import * as React from 'react'

import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata } from '@/__private__/storybook'

import { Component } from '../Component'

import mdx from './Component.mdx'
import './Component.stories.css'

export function Playground() {
  return <Component />
}

export default createMetadata({
  title: 'Компоненты|/Component',
  id: 'components/Component',
  decorators: [withSmartKnobs()],
  parameters: {
    docs: {
      page: mdx,
    },
    environment: {
      style: {
        width: 320,
      },
    },
  },
})
