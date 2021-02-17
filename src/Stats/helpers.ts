import { ReactElement } from 'react'

import { TextPropSize } from '@consta/uikit/Text'

import { IconSize } from '@/__private__/utils/consta'
import { DECIMAL_SEPARATOR, NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

export const sizes = ['2xs', 'xs', 's', 'm', 'l'] as const
export type Size = typeof sizes[number]

export const layouts = ['default', 'reversed'] as const
export type Layout = typeof layouts[number]

export const statuses = ['success', 'warning', 'error', 'system'] as const
export type Status = typeof statuses[number]

export const iconsArrowRate = ['up', 'down', 'auto'] as const
export type IconArrowRate = typeof iconsArrowRate[number]

export type IconTitle = (props: { size: IconSize }) => ReactElement | null

export type FormatRate = (value: string) => string

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

export const defaultFormatter = (value: string | number) => {
  return String(value)
    .replace(/(\d)(?=(\d{3})+\b)(?<!\.\d+)/g, `$1${NARROW_NO_BREAK_SPACE}`)
    .replace(/(?<=\d+)\.(?=\d+)/g, DECIMAL_SEPARATOR)
}

export const isNegativeRate = (rate: string) => {
  const [match] = /-?[0-9]+/.exec(rate) || []

  return Number(match) < 0
}

export const replaceRateSign = (rate: string) => {
  return rate.replace(/[-+](?=[0-9]+)/, '')
}
