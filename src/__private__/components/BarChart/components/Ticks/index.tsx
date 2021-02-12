import React, { RefObject, useLayoutEffect, useState } from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'
import { times } from 'lodash'

import { Scaler } from '@/__private__/utils/scale'

import { cropText, getTextAlign, getTransformTranslate, SLANTED_TEXT_MAX_LENGTH } from './helpers'
import css from './index.css'

export const positions = ['top', 'right', 'bottom', 'left'] as const
export type Position = typeof positions[number]

type Props<T> = {
  values: readonly T[]
  disabledValues?: readonly T[]
  scaler?: Scaler<T>
  position: Position
  showLine?: boolean
  isTicksSnuggleOnEdge?: boolean
  className?: string
  isXAxisLabelsSlanted?: boolean
  style?: React.CSSProperties
  formatValueForLabel?: (value: T) => string
} & (
  | {
      isLabel: true
      getGridAreaName: (index: number) => string
    }
  | {
      isLabel?: never
    }
)

const positionClasses: Record<Position, string> = {
  top: css.isTop,
  right: css.isRight,
  bottom: css.isBottom,
  left: css.isLeft,
}

export function Ticks<T>(props: Props<T>) {
  const {
    isXAxisLabelsSlanted,
    className,
    values,
    disabledValues = [],
    scaler,
    position,
    showLine = true,
    isTicksSnuggleOnEdge = false,
    style,
    formatValueForLabel = String,
  } = props
  const isTop = position === 'top'
  const isBottom = position === 'bottom'
  const isHorizontal = isTop || isBottom
  const [maxLabelHeight, setMaxLabelHeight] = useState(0)

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
  }, [refs, values, isXAxisLabelsSlanted])

  const getBandwidth = (v: T) => {
    return scaler?.bandwidth ? scaler.bandwidth(v) : 0
  }

  const getTickOffset = (v: T) => getBandwidth(v) / 2

  const tickTransform = isHorizontal
    ? (v: T) => getTransformTranslate((scaler?.scale(v) || 0) + getTickOffset(v), 0)
    : (v: T) => getTransformTranslate(0, (scaler?.scale(v) || 0) + getTickOffset(v))

  const positionClassName = positionClasses[position]

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

  const children = values.map((value, idx) => {
    const transform = scaler && tickTransform(value)
    const alignItems = getAlignItems(idx, values.length)
    const textValue = formatValueForLabel(value)
    const textAlign = getTextAlign({ isXAxisLabelsSlanted, isHorizontal })
    return (
      <div
        key={idx}
        className={classnames(
          className,
          positionClasses[position],
          props.isLabel ? css.label : css.tick,
          isXAxisLabelsSlanted && css.isXAxisLabelsSlanted
        )}
        style={{
          transform,
          alignItems,
          minHeight: isXAxisLabelsSlanted ? maxLabelHeight : undefined,
          gridArea: props.isLabel ? props.getGridAreaName(idx) : '',
        }}
      >
        <Text
          as="div"
          view="secondary"
          size={'xs'}
          align={textAlign}
          title={textValue}
          className={classnames(
            css.text,
            isDisabled(value) && css.isDisabled,
            isHorizontal && css.isHorizontal
          )}
          lineHeight="s"
        >
          {(isXAxisLabelsSlanted && (
            <span ref={refs[idx]}>{cropText(textValue, SLANTED_TEXT_MAX_LENGTH)}</span>
          )) ||
            textValue}
        </Text>
        {showLine && <span className={css.line} />}
      </div>
    )
  })

  return props.isLabel ? (
    <>{children}</>
  ) : (
    <div className={classnames(css.group, positionClassName, className)} style={style}>
      {children}
    </div>
  )
}
