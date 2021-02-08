import React from 'react'

import { Example } from '@/__private__/storybook'
import { cn } from '@/__private__/utils/bem'

import { Component } from '../../../Component'

import './ComponentExampleSimple.css'

const cnComponentExampleSimple = cn('ComponentExampleSimple')

export function ComponentExampleSimple() {
  return (
    <Example className={cnComponentExampleSimple()}>
      <Component />
    </Example>
  )
}
