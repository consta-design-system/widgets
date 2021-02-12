import React from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'

import { ColumnProperty } from '@/__private__/components/BarChart/components/Column'
import { NumberRange } from '@/__private__/utils/scale'

import { LabelSize } from '../..'

import { getBackground, getColor, getRoundedBorder, getSize, getTriangle } from './helpers'
import css from './index.css'

type Props = {
  color: string
  length: number
  isHorizontal: boolean
  isReversed: boolean
  isActive: boolean
  label?: string
  className?: string
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onChangeLabelSize?: (size: LabelSize) => void
  columnProperty: ColumnProperty
  gridDomain: NumberRange
  maxLabelSize: LabelSize
}

export const Section = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      color,
      length,
      isHorizontal,
      isReversed,
      isActive,
      label,
      className,
      onMouseEnter,
      onMouseLeave,
      onChangeLabelSize,
      columnProperty,
      gridDomain,
      maxLabelSize,
    },
    ref
  ) => {
    const labelRef = React.useRef<HTMLDivElement>(null)
    const isOverflow =
      (!isReversed && gridDomain[1] < Number(label)) ||
      (isReversed && gridDomain[0] > Number(label))

    React.useLayoutEffect(() => {
      if (!label || !labelRef.current) {
        return
      }

      const { width, height } = labelRef.current.getBoundingClientRect()

      onChangeLabelSize &&
        onChangeLabelSize({ width: Math.round(width), height: Math.round(height) })
    }, [label, labelRef, onChangeLabelSize])

    return (
      <div
        ref={ref}
        className={classnames(
          css.section,
          isHorizontal && css.isHorizontal,
          isReversed && css.isReversed,
          isActive && css.isActive,
          className
        )}
        style={{
          ...getSize(length, isHorizontal),
          ...getRoundedBorder(columnProperty, isHorizontal),
          ...getBackground(color, length, isOverflow, isHorizontal, isReversed),
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isOverflow && (
          <div
            className={classnames(
              css.overflow,
              css.isHorizontal && isHorizontal,
              css.isReversed && isReversed
            )}
            style={getTriangle(color, isOverflow, isHorizontal, isReversed, maxLabelSize)}
          />
        )}
        {label && (
          <Text
            ref={labelRef}
            as="div"
            view="primary"
            className={css.label}
            size="xs"
            style={getColor(color, isOverflow)}
          >
            {label}
          </Text>
        )}
      </div>
    )
  }
)
