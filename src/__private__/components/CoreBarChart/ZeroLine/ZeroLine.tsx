import React from 'react'

import { cn } from '@/__private__/utils/bem'
import { Scaler } from '@/__private__/utils/scale'

import './ZeroLine.css'

const cnZeroLine = cn('ZeroLine')

type Props = {
  valuesScale: Scaler<number>
  isHorizontal: boolean
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

export const ZeroLine: React.FC<Props> = ({ valuesScale, isHorizontal }) => {
  const scaledValue = valuesScale.scale(0)
  let linePos

  if (scaledValue) {
    linePos = getLinePosition(scaledValue, isHorizontal)
  }

  return (
    <svg className={cnZeroLine('Main')}>
      <line className={cnZeroLine('Line')} {...linePos} />
    </svg>
  )
}
