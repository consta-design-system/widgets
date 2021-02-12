import React from 'react'

import { Tooltip } from '@consta/uikit/Tooltip'
import { object, text } from '@storybook/addon-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'

import { TooltipContentForMultipleValues } from '.'

export const Interactive = createStory(() => (
  <Tooltip size="l" position={{ x: 30, y: 10 }} direction="downRight">
    <TooltipContentForMultipleValues
      title={text('title', 'Тестовый заголовок')}
      items={object('items', [
        {
          color: 'var(--color-bg-alert)',
          name: 'Первый длинный заголовок',
          value: 10,
        },
        {
          color: 'var(--color-bg-normal)',
          name: 'Второй длинный заголовок',
          value: 10000000,
        },
      ])}
    />
  </Tooltip>
))

export default createMetadata({
  title: 'Компоненты|/TooltipContentForMultipleValues',
  id: 'components/TooltipContentForMultipleValues',
})
