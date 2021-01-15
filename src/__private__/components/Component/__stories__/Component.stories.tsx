import * as React from 'react'

import { text } from '@storybook/addon-knobs'

import { createMetadata } from '@/__private__/storybook'
import { cn } from '@/__private__/utils/bem'

import { Component } from '../Component'

import mdx from './Component.mdx'
import './Component.stories.css'

const defaultKnobs = () => ({
  text: text('text', ''),
})

const cnComponentStories = cn('ComponentStories')

export function Playground() {
  const { text } = defaultKnobs()

  return (
    <div className={cnComponentStories()}>
      <Component text={text} />
    </div>
  )
}

export default createMetadata({
  title: 'Компоненты|/Component',
  id: 'components/Component',
  parameters: {
    docs: {
      page: mdx,
    },
  },
})
