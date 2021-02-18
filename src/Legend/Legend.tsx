import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/__private__/utils/bem'
import { LegendItem } from '@/LegendItem'
import { LabelPosition, LabelSize, LabelType } from '@/LegendItem/helpers'

import { LegendDataItem, LegendDirection } from './helpers'
import './Legend.css'

const cnLegend = cn('Legend')

type Props = HTMLAttributes<HTMLDivElement> & {
  data: readonly LegendDataItem[]
  direction: LegendDirection
  labelType: LabelType
  size: LabelSize
  labelPosition: LabelPosition
  lineBold?: boolean
  title?: ReactNode
  onItemMouseEnter?: (item: LegendDataItem) => void
  onItemMouseLeave?: (item: LegendDataItem) => void
}

export const Legend = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    direction,
    data,
    labelType,
    labelPosition,
    lineBold,
    size,
    title,
    onItemMouseEnter,
    onItemMouseLeave,
    ...mainElementProps
  } = props

  return (
    <div
      {...mainElementProps}
      ref={ref}
      className={cnLegend({ direction, isHoverable: !!onItemMouseEnter })}
    >
      {title && <div className={cnLegend('Title')}>{title}</div>}
      {data.map(item => (
        <LegendItem
          color={item.color}
          key={item.text}
          className={cnLegend('Item')}
          size={size}
          type={labelType}
          position={labelPosition}
          isLineBold={lineBold}
          shouldCropText
          onMouseEnter={onItemMouseEnter ? () => onItemMouseEnter(item) : undefined}
          onMouseLeave={onItemMouseLeave ? () => onItemMouseLeave(item) : undefined}
        >
          {item.text}
        </LegendItem>
      ))}
    </div>
  )
})
