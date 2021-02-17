import React from 'react'

import { Scaler } from '@/__private__/utils/scale'

import { cn } from '@/__private__/utils/bem'

import './Grid.css'

const cnGrid = cn('Grid')

type Props = {
  scalerX: Scaler<number>
  scalerY: Scaler<number>
  xTickValues: readonly number[]
  yTickValues: readonly number[]
  width: number
  height: number
  xGridGuide?: number
  yGridGuide?: number
}

export const Grid: React.FC<Props> = ({
  scalerX,
  scalerY,
  xTickValues,
  yTickValues,
  width,
  height,
  xGridGuide,
  yGridGuide,
}) => (
  <g className={cnGrid('Main')}>
    {xTickValues.map(tick => {
      const x = scalerX.scale(tick)
      const isGuide = xGridGuide && tick === xGridGuide

      return (
        <line
          key={tick}
          className={cnGrid('Line', {guide: isGuide})}
          x1={x}
          x2={x}
          y1={0}
          y2={height}
        />
      )
    })}
    {yTickValues.map(tick => {
      const y = scalerY.scale(tick)
      const isGuide = yGridGuide && tick === yGridGuide

      return (
        <line
          key={tick}
          className={cnGrid('Line', {guide: isGuide})}
          x1={0}
          x2={width}
          y1={y}
          y2={y}
        />
      )
    })}
  </g>
)
