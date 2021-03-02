import React from 'react'

import { cn } from '@/__private__/utils/bem'
import { formatForValue } from '@/__private__/utils/formatForValue'
import { Scaler } from '@/__private__/utils/scale'

import './Threshold.css'

const cnThreshold = cn('Threshold')

type Props = {
  valuesScale: Scaler<number>
  isHorizontal: boolean
  value: number
}

const getLinePosition = (value: number, isHorizontal: boolean) => {
  if (isHorizontal) {
    return {
      x1: value,
      x2: value,
      y1: '0%',
      y2: '100%',
    }
  }

  return {
    x1: '0%',
    x2: '100%',
    y1: value,
    y2: value,
  }
}

const getPositionText = (value: number, isHorizontal: boolean) => {
  if (isHorizontal) {
    return {
      x: value,
      y: '0',
      dy: '-8px',
    }
  }

  return {
    x: '100%',
    y: value,
    dx: '8px',
  }
}

export const Threshold: React.FC<Props> = ({ valuesScale, isHorizontal, value }) => {
  const scaledValue = valuesScale.scale(value)
  const linePos = getLinePosition(scaledValue, isHorizontal)
  const textPos = getPositionText(scaledValue, isHorizontal)
  const horizontal = !isHorizontal ? 'vertical' : ''

  const textValue = formatForValue(String(value))

  return (
    <>
      <line stroke={'var(--color-bg-warning)'} className={cnThreshold('Main')} {...linePos} />
      <text {...textPos} className={cnThreshold('Text', { horizontal })}>
        {textValue}
      </text>
    </>
  )
}
