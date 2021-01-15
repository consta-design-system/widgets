import React from 'react'

import { Text } from '@consta/uikit/Text'

import { cn } from '@/__private__/utils/bem'

import './Component.css'

type TextProps = React.ComponentProps<typeof Text>

type ComponentProps = {
  text?: string
} & TextProps

export const cnComponent = cn('Component')

export const Component: React.FC<ComponentProps> = ({ text }) => {
  return <Text className={cnComponent()}>{text ? text : 'Component'}</Text>
}
