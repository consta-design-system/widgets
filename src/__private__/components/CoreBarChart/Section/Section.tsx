import React from 'react'

import { Text } from '@consta/uikit/Text'

import { ColumnProperty } from '@/__private__/components/CoreBarChart/Column/Column'
import { cn } from '@/__private__/utils/bem'
import { NumberRange } from '@/__private__/utils/scale'

import { LabelSize } from '../CoreBarChart'

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
      maxLabelSize,
      numberColumnSections,
      indexSection,
    },
    ref
  ) => {
    const labelRef = React.useRef<HTMLDivElement>(null)
    const isOverflow =
      (!isReversed && gridDomain[1] < Number(label)) ||
      (isReversed && gridDomain[0] > Number(label))

    React.useEffect(() => {
      if (!label || !labelRef.current) {
        return
      }

      const { width, height } = labelRef.current.getBoundingClientRect()

      onChangeLabelSize &&
        onChangeLabelSize({ width: Math.round(width), height: Math.round(height) })
    }, [label, labelRef, onChangeLabelSize])

    const reversed = getReversed(isHorizontal, isReversed)
    const horizontal = isHorizontal ? 'isHorizontal' : 'notHorizontal'
    const lastSection =
      (!!indexSection && numberColumnSections === indexSection + 1) || numberColumnSections === 1
    const overflowLength =
      isOverflow && numberColumnSections === 1 ? getReversed(isHorizontal, isReversed) : ''

    return (
      <div
        ref={ref}
        className={cnSection('Sections', {
          horizontal,
          reversed,
          isActive,
          overflowLength,
        })}
        style={{
          ...getSize(length, isHorizontal, isOverflow, numberColumnSections, indexSection),
          ...getRoundedBorder(columnProperty, reversed, lastSection),
          ...getBackground(color, length, isOverflow, lastSection, reversed, numberColumnSections),
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
            style={getTriangle(color, isOverflow, reversed, maxLabelSize, lastSection)}
          />
        )}
        {label && numberColumnSections === 1 && (
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
