import React from 'react'

import { Text } from '@consta/uikit/Text'

import { cn } from '@/__private__/utils/bem'

import './Component.css'

type TextProps = Omit<React.ComponentProps<typeof Text>, 'className'>

type ComponentProps = TextProps & {
  text?: string
}

export const cnComponent = cn('Component')

export const Component: React.FC<ComponentProps> = ({ text, ...textProps }) => {
  return (
    <Text {...textProps} className={cnComponent()}>
      {text ? text : 'Component'}
    </Text>
  )
}
