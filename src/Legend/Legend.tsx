import React from 'react'

import { Title } from '@/__private__/components/Title/Title'
import { cn } from '@/__private__/utils/bem'
import { LabelPosition, LabelType, LegendItem, Size } from '@/LegendItem/LegendItem'

import './Legend.css'

const cnLegend = cn('Legend')

export const directions = ['column', 'row'] as const
export type Direction = typeof directions[number]

export type Item = {
  text: string
  color: string
}
export type Items = readonly Item[]

type Props = {
  items: Items
  direction: Direction
  type: LabelType
  size: Size
  labelPosition: LabelPosition
  title?: React.ReactNode
  onItemMouseEnter?: (item: Item) => void
  onItemMouseLeave?: (item: Item) => void
}

export const Legend: React.FC<Props> = ({
  direction,
  items,
  type,
  labelPosition,
  size,
  title,
  onItemMouseEnter,
  onItemMouseLeave,
}) => {
  return (
    <div
      className={cnLegend('Main', {
        isHoverable: Boolean(onItemMouseEnter),
        column: direction === 'column',
      })}
    >
      <Title className={cnLegend('Title')}>{title}</Title>
      {items.map(item => (
        <LegendItem
          color={item.color}
          key={item.text}
          className={cnLegend('Item')}
          size={size}
          type={type}
          position={labelPosition}
          shouldCropText
          onMouseEnter={onItemMouseEnter ? () => onItemMouseEnter(item) : undefined}
          onMouseLeave={onItemMouseLeave ? () => onItemMouseLeave(item) : undefined}
        >
          {item.text}
        </LegendItem>
      ))}
    </div>
  )
}
