import { ReactNode } from 'react'

import { TextPropSize } from '@consta/uikit/Text'

import { FormatValue } from '@/__private__/types'
import { IconSize } from '@/__private__/utils/consta'
import { NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

export const sizes = ['2xs', 'xs', 's', 'm', 'l'] as const
export type Size = typeof sizes[number]

export const layouts = ['default', 'reversed'] as const
export type Layout = typeof layouts[number]

export const statuses = ['success', 'warning', 'error', 'system'] as const
export type Status = typeof statuses[number]

export const iconsArrowRate = ['up', 'down', 'auto'] as const
export type IconArrowRate = typeof iconsArrowRate[number]

export type IconTitle = (props: { size: IconSize }) => ReactNode

export const titleSizes: Record<Size, TextPropSize> = {
  '2xs': 'xs',
  xs: 'm',
  s: 'l',
  m: 'xl',
  l: '2xl',
}

export const iconTitleSizes: Record<Size, IconSize> = {
  '2xs': 'xs',
  xs: 's',
  s: 's',
  m: 'm',
  l: 'm',
}

export const defaultValueFormatter: FormatValue = value => {
  return String(value)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${NARROW_NO_BREAK_SPACE}`)
    .replace('.', ',')
}

export const isNegativeRate = (rate: string) => {
  const [match] = /-?[0-9]+/.exec(rate) || []

  return Number(match) < 0
}

export const replaceRateSign = (rate: string) => {
  return rate.replace(/[-+](?=[0-9]+)/, '')
}