import React, { RefObject, useLayoutEffect, useState } from 'react'

import { Text } from '@consta/uikit/Text'
import { times } from 'lodash'

import { cn } from '@/__private__/utils/bem'
import { Scaler } from '@/__private__/utils/scale'

import {
  cropText,
  getTextAlign,
  getTransformTranslate,
  getXAxisLabelsSlanted,
  SLANTED_TEXT_MAX_LENGTH,
} from './helpers'
import './Ticks.css'

const cnTicks = cn('Ticks')

export const positions = ['top', 'right', 'bottom', 'left'] as const
export type Position = typeof positions[number]

type Props<T> = {
  values: readonly T[]
  disabledValues?: readonly T[]
  scaler?: Scaler<T>
  position: Position
  isTicksSnuggleOnEdge?: boolean
  isXAxisLabelsSlanted?: boolean
  style?: React.CSSProperties
  formatValueForLabel?: (value: T) => string
  formatGroupName?: (value: T) => React.ReactNode
} & (
  | {
      isLabel: true
      getGridAreaName: (index: number) => string
    }
  | {
      isLabel?: never
    }
)

export function Ticks<T>(props: Props<T>) {
  const {
    isXAxisLabelsSlanted,
    values,
    disabledValues = [],
    scaler,
    position,
    isTicksSnuggleOnEdge = false,
    style,
    formatValueForLabel = String,
    formatGroupName,
  } = props
  const isTop = position === 'top'
  const isBottom = position === 'bottom'
  const isHorizontal = isTop || isBottom
  const [maxLabelHeight, setMaxLabelHeight] = useState(0)
  const [maxLabelWidth, setMaxLabelWidth] = useState(0)
  const refs: ReadonlyArray<RefObject<HTMLDivElement>> = times(values.length, () =>
    React.createRef()
  )

  useLayoutEffect(() => {
    const refsHeights = refs.map(ref => {
      if (!ref.current) {
        return 0
      }
      const height = ref.current.getBoundingClientRect().height
      return Math.round(height)
    })

    setMaxLabelHeight(Math.max(0, ...refsHeights))

    const refsWidth = refs.map(ref => {
      if (!ref.current) {
        return 0
      }
      const width = ref.current.getBoundingClientRect().width
      return Math.round(width)
    })

    setMaxLabelWidth(Math.max(0, ...refsWidth))
  }, [refs, values, isXAxisLabelsSlanted])

  const getBandwidth = (v: T) => {
    return scaler?.bandwidth ? scaler.bandwidth(v) : 0
  }

  const getTickOffset = (v: T) => getBandwidth(v) / 2

  const tickTransform = isHorizontal
    ? (v: T) => getTransformTranslate((scaler?.scale(v) || 0) + getTickOffset(v), 0)
    : (v: T) => getTransformTranslate(0, (scaler?.scale(v) || 0) + getTickOffset(v))

  const getAlignItems = (index: number, length: number) => {
    const isFirst = index === 0
    const isLast = index === length - 1

    if (
      (isHorizontal && isTicksSnuggleOnEdge && isFirst) ||
      (!isHorizontal && isTicksSnuggleOnEdge && isLast)
    ) {
      return 'flex-start'
    }

    if (
      (isHorizontal && isTicksSnuggleOnEdge && isLast) ||
      (!isHorizontal && isTicksSnuggleOnEdge && isFirst)
    ) {
      return 'flex-end'
    }

    if (
      (isHorizontal && !isTicksSnuggleOnEdge && props.isLabel) ||
      (isHorizontal && !isTicksSnuggleOnEdge && props.isLabel)
    ) {
      return 'baseline'
    }

    return 'center'
  }

  const isDisabled = (value: T) => disabledValues.includes(value)
  const typeTicks = props.isLabel ? 'Label' : 'Tick'

  const children = values.map((value, idx) => {
    const transform = scaler && tickTransform(value)
    const alignItems = getAlignItems(idx, values.length)
    const textValue = formatValueForLabel(value)
    const textAlign = getTextAlign({ isXAxisLabelsSlanted, isHorizontal })
    const xAxisLabelsSlanted = getXAxisLabelsSlanted(isHorizontal, isXAxisLabelsSlanted)

    return (
      <div
        key={idx}
        className={cnTicks(typeTicks, {
          position,
          xAxisLabelsSlanted,
        })}
        style={{
          transform,
          alignItems,
          minHeight: isXAxisLabelsSlanted && isHorizontal ? maxLabelHeight : undefined,
          minWidth: isXAxisLabelsSlanted && !isHorizontal ? maxLabelWidth : undefined,
          gridArea: props.isLabel ? props.getGridAreaName(idx) : '',
        }}
      >
        {formatGroupName && formatGroupName(value) !== undefined && props.isLabel ? (
          formatGroupName(value)
        ) : (
          <Text
            as="div"
            view="secondary"
            size={'xs'}
            align={textAlign}
            title={textValue}
            className={cnTicks('Text', {
              isDisabled: isDisabled(value),
              isHorizontal,
            })}
            lineHeight="s"
          >
            {(isXAxisLabelsSlanted && (
              <span ref={refs[idx]}>{cropText(textValue, SLANTED_TEXT_MAX_LENGTH)}</span>
            )) ||
              textValue}
          </Text>
        )}
      </div>
    )
  })

  return props.isLabel ? (
    <>{children}</>
  ) : (
    <div className={cnTicks('Group', { position })} style={style}>
      {children}
    </div>
  )
}
