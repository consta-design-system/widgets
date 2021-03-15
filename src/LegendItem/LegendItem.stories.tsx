import React from 'react'

import { IconWarning } from '@consta/uikit/IconWarning'
import { select, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'

import { Icon, iconTypes, LegendItem, sizes } from './LegendItem'

const getCommonProps = () =>
  ({
    iconType: select('icon', [...iconTypes, 'customIcon'], iconTypes[0]),
    size: select('size', sizes, sizes[1]),
    label: text('label', 'Тестовый текст'),
    color: text('color', 'red'),
  } as const)

export const Interactive = createStory(() => {
  const { iconType, size, label, color } = getCommonProps()
  const Icon = () => <IconWarning view="warning" size="s" />
  const iconSelect = {
    dot: 'dot',
    line: 'line',
    lineBold: 'lineBold',
    gap: 'gap',
    customIcon: Icon,
  }
  const icon = iconSelect[iconType]
  return <LegendItem icon={icon as Icon} size={size} label={label} color={color} />
})

export default createMetadata({
  title: 'Компоненты|/LegendItem',
  id: 'components/LegendItem',
  parameters: {
    environment: {
      style: {
        width: 200,
      },
    },
  },
})
