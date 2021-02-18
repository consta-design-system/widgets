import React, { forwardRef, HTMLAttributes } from 'react'

import { IconWarning } from '@consta/uikit/IconWarning'
import { Text } from '@consta/uikit/Text'

import { cn } from '@/__private__/utils/bem'

import { LabelPosition, LabelSize, LabelType, LABEL_DOT_SIZE } from './helpers'
import './LegendItem.css'

const cnLegendItem = cn('LegendItem')

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  color?: string
  type?: LabelType
  size?: LabelSize
  position?: LabelPosition
  isLineBold?: boolean
  /** Обрезать текст, если он больше 2 строк */
  shouldCropText?: boolean
}

export const LegendItem = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    color,
    type = 'dot',
    size = 's',
    position = 'left',
    isLineBold,
    className,
    shouldCropText,
    ...mainElementProps
  } = props
  const dotStyle = type === 'dot' ? { width: LABEL_DOT_SIZE, height: LABEL_DOT_SIZE } : {}

  return (
    <div {...mainElementProps} ref={ref} className={cnLegendItem({ position }, [className])}>
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
              className={cnLegendItem('Sign', { type: 'icon', size })}
              size={size}
              style={{ color }}
            />
          ) : (
            <div
              className={cnLegendItem('Sign', { type, size, isLineBold })}
              style={{ color, ...dotStyle }}
            />
          )}
        </div>
      )}
      <Text
        className={cnLegendItem('Text', { isSeparating: shouldCropText })}
        as="span"
        size={size}
        view="primary"
      >
        {children}
      </Text>
    </div>
  )
})
