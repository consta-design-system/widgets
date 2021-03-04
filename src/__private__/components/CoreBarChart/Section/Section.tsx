import React, { useState } from 'react'

import { Text } from '@consta/uikit/Text'

import { ColumnProperty } from '@/__private__/components/CoreBarChart/Column/Column'
import { cn } from '@/__private__/utils/bem'
import { formatForValue } from '@/__private__/utils/formatForValue'
import { NumberRange } from '@/__private__/utils/scale'

import { LabelSize } from '../CoreBarChart'

import {
  getBackground,
  getColor,
  getDirection,
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
  numberColumnSections: number
  indexSection?: number
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
      numberColumnSections,
      indexSection,
    },
    ref
  ) => {
    const labelRef = React.useRef<HTMLDivElement>(null)
    const [labelWidth, setLabelWidth] = useState<number | null>(null)

    const isOverflow =
      (!isReversed && gridDomain[1] < Number(label)) ||
      (isReversed && gridDomain[0] > Number(label))

    React.useEffect(() => {
      if (!label || !labelRef.current) {
        return
      }

      const { width, height } = labelRef.current.getBoundingClientRect()

      setLabelWidth(width)

      onChangeLabelSize &&
        onChangeLabelSize({ width: Math.round(width), height: Math.round(height) })
    }, [label, labelRef, onChangeLabelSize])

    const direction = getDirection(isHorizontal, isReversed)
    const horizontal = !isHorizontal ? 'vertical' : ''
    const lastSection =
      (!!indexSection && numberColumnSections === indexSection + 1) || numberColumnSections === 1
    const columnOverflow =
      isOverflow && numberColumnSections === 1 ? getDirection(isHorizontal, isReversed) : ''
    const formatLabel = label && formatForValue(label)

    return (
      <div
        ref={ref}
        className={cnSection('Sections', {
          horizontal,
          direction,
          isActive,
          columnOverflow,
        })}
        style={{
          ...getSize(length, isHorizontal, isOverflow, numberColumnSections, indexSection),
          ...getRoundedBorder(columnProperty, direction, lastSection),
          ...getBackground(color, length, isOverflow, lastSection, direction, numberColumnSections),
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isOverflow && (
          <svg
            className={cnSection('Overflow', {
              horizontal,
              direction,
            })}
            style={getTriangle(isOverflow, direction, labelWidth, lastSection)}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path d="M4 0.5L8 5H0L4 0.5Z" fill={color} />
          </svg>
        )}
        {label && lastSection && (
          <Text
            ref={labelRef}
            as="div"
            view="primary"
            className={cnSection('Label')}
            size="xs"
            style={getColor(color, isOverflow)}
          >
            {formatLabel}
          </Text>
        )}
      </div>
    )
  }
)
