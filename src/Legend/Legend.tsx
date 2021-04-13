import React from 'react'

import { Title } from '@/__private__/components/Title/Title'
import { cn } from '@/__private__/utils/bem'
import { PropsWithHTMLAttributesAndRef } from '@/__private__/utils/types/PropsWithHTMLAttributes'
import { Icon, LegendItem, LegendItemMouseEventHandler, Size } from '@/LegendItem/LegendItem'

import './Legend.css'

const cnLegend = cn('Legend')

export const directions = ['column', 'row'] as const
export type Direction = typeof directions[number]

type CommonProps<ITEM> = {
  items: readonly ITEM[]
  getItemLabel: (item: ITEM) => string
  getItemColor: (item: ITEM) => string
  direction: Direction
  icon?: Icon
  renderLeftSide?: () => React.ReactNode
  size: Size
  title?: React.ReactNode
  onItemMouseEnter?: LegendItemMouseEventHandler<ITEM>
  onItemMouseLeave?: LegendItemMouseEventHandler<ITEM>
  onItemClick?: LegendItemMouseEventHandler<ITEM>
}

type Props<ITEM> = PropsWithHTMLAttributesAndRef<CommonProps<ITEM>, HTMLDivElement>

type Legend = <ITEM>(props: Props<ITEM>) => React.ReactElement | null

export const Legend: Legend = React.forwardRef((props, ref) => {
  const {
    direction,
    items,
    getItemLabel,
    getItemColor,
    icon,
    size,
    title,
    onItemMouseEnter,
    onItemMouseLeave,
    onItemClick,
  } = props
  return (
    <div
      ref={ref}
      className={cnLegend({
        isHoverable: Boolean(onItemMouseEnter),
        isClickable: Boolean(onItemClick),
        column: direction === 'column',
      })}
    >
      <Title>{title}</Title>
      {items.map(item => (
        <LegendItem
          label={getItemLabel(item)}
          color={getItemColor(item)}
          key={getItemLabel(item)}
          className={cnLegend('Item')}
          size={size}
          icon={icon}
          shouldCropText
          onMouseEnter={e => onItemMouseEnter?.({ e, item })}
          onMouseLeave={e => onItemMouseLeave?.({ e, item })}
          onClick={e => onItemClick?.({ e, item })}
        />
      ))}
    </div>
  )
})
