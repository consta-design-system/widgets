import React from 'react'

import { Text, TextPropLineHeight, TextPropSize } from '@consta/uikit/Text'
import { isDefined } from '@consta/widgets-utils/lib/type-guards'

import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'

import { defaultValueFormatter } from './helpers'
import './Stats.css'

const cnStats = cn('Stats')

const sizes = ['2xs', 'xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

const layouts = ['default', 'reversed'] as const
type Layout = typeof layouts[number]

const statuses = ['success', 'warning', 'error', 'system'] as const
type Status = typeof statuses[number]

type Props = {
  value: number
  size: Size
  title?: string
  numberBadge?: number
  unit?: string
  layout?: Layout
  status?: Status
  withSign?: boolean
  formatValue?: FormatValue
  children?: never
}

const titleSizes: Record<Size, TextPropSize> = {
  '2xs': 'xs',
  xs: 'm',
  s: 'l',
  m: 'xl',
  l: '2xl',
}

const numberBadgeLineHeight: Record<Size, TextPropLineHeight> = {
  '2xs': 'xs',
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
}

const getNumberSign = (value: number, isShow?: boolean) => {
  return value > 0 && isShow ? '+' : ''
}

export const Stats: React.FC<Props> = ({
  title,
  value,
  numberBadge,
  unit,
  size,
  status,
  layout = 'default',
  withSign,
  formatValue = defaultValueFormatter,
}) => {
  const valueModificators = {
    status: isDefined(numberBadge) ? undefined : status,
  }

  return (
    <div className={cnStats({ layout, size })}>
      <Text
        className={cnStats('Title')}
        as="div"
        size={titleSizes[size]}
        lineHeight="s"
        view="primary"
      >
        {title}
      </Text>

      <Text className={cnStats('Value', valueModificators)} as="div" lineHeight="2xs" weight="bold">
        {getNumberSign(value, withSign)}
        {formatValue(value)}
      </Text>

      <Text
        className={cnStats('Badge', { status })}
        as="div"
        lineHeight={numberBadgeLineHeight[size]}
      >
        {numberBadge}
      </Text>

      <Text
        className={cnStats('Unit')}
        as="div"
        size={titleSizes[size]}
        lineHeight="s"
        view="secondary"
      >
        {unit}
      </Text>
    </div>
  )
}
