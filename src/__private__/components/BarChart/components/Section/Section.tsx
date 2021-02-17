import React from 'react'

import { Text } from '@consta/uikit/Text'

import { ColumnProperty } from '@/__private__/components/BarChart/components/Column/Column'
import { cn } from '@/__private__/utils/bem'
import { NumberRange } from '@/__private__/utils/scale'

import { LabelSize } from '../../BarChart'

import {
  getBackground,
  getColor,
  getReversed,
  getRoundedBorder,
  getSize,
  getTriangle,
} from './helpers'
import './Section.css'

const cnSection = cn('Section')

type Props = {
  color: string
  length: number
  isHorizontal: boolean
  isReversed: boolean
  isActive: boolean
  label?: string
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

    const reversed = getReversed(isHorizontal, isReversed)
    const horizontal = isHorizontal ? 'isHorizontal' : 'notHorizontal'

    return (
      <div
        ref={ref}
        className={cnSection('Sections', {
          horizontal,
          reversed,
          isActive,
        })}
        style={{
          ...getSize(length, isHorizontal),
          ...getRoundedBorder(columnProperty, reversed),
          ...getBackground(color, length, isOverflow, isHorizontal, isReversed),
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isOverflow && (
          <div
            className={cnSection('Overflow', {
              horizontal,
              reversed,
            })}
            style={getTriangle(color, isOverflow, isHorizontal, isReversed, maxLabelSize)}
          />
        )}
        {label && (
          <Text
            ref={labelRef}
            as="div"
            view="primary"
            className={cnSection('Label')}
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
