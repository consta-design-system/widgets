import React from 'react'

import { IconWarning } from '@consta/uikit/IconWarning'
import { Text } from '@consta/uikit/Text'

import { cn } from '@/__private__/utils/bem'

import './LegendItem.css'

const cnLegendItem = cn('LegendItem')

export const labelTypes = ['dot', 'line', 'lineBold', 'warning'] as const
export type LabelType = typeof labelTypes[number]

export const sizes = ['xs', 's', 'm'] as const
export type Size = typeof sizes[number]

export const labelPositions = ['top', 'left'] as const
export type LabelPosition = typeof labelPositions[number]

type Props = {
  children: React.ReactNode
  color?: string
  type?: LabelType
  size?: Size
  position?: LabelPosition
  className?: string
  /** Обрезать текст, если он больше 2 строк */
  shouldCropText?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const DOT_SIZE = 12

export const LegendItem = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    color,
    type = 'dot',
    size = 's',
    position = 'left',
    className,
    shouldCropText,
    onMouseEnter,
    onMouseLeave,
  } = props
  const positionClass = ['dot', 'warning'].includes(type) ? 'left' : position
  const dotStyle = type === 'dot' ? { width: DOT_SIZE, height: DOT_SIZE } : {}

  return (
    <div
      ref={ref}
      className={cnLegendItem('Main', { size, position: positionClass }, [className])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {color && (
        <div className={cnLegendItem('SignWrapper')}>
          {/*
          Эта дополнительная вложенность необходима чтобы получить возможность
          применить vertical-align к вложенному элементу, так как vertical-align
          не может примениться к элементу у которого родитель flex или inline-flex.

          Другие типы выравнивания нам не подходят потому что:
          - `align-items: center` центрирует по всей высоте и ломает отображение
            легенды с многострочным текстом;
          - `align-items: baseline` из-за невозможности применить отрицательный
            сдвиг используя margin, который необходим для размеров `s` и `xs`.
        */}
          {type === 'warning' ? (
            <IconWarning
              className={cnLegendItem('Sign', { type: 'icon' })}
              size="s"
              style={{ color }}
            />
          ) : (
            <div
              className={cnLegendItem('Sign', { type })}
              style={{ background: color, ...dotStyle }}
            />
          )}
        </div>
      )}
      <Text
        as="span"
        size={size}
        view="primary"
        display="inlineBlock"
        className={cnLegendItem('Text', { isSeparating: shouldCropText })}
      >
        {children}
      </Text>
    </div>
  )
})
