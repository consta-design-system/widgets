import React from 'react'

import { cn } from '@/__private__/utils/bem'
import { Scaler } from '@/__private__/utils/scale'

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
  showLineAtZero?: boolean
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
  showLineAtZero,
}) => {
  return (
    <g className={cnGrid('Main')}>
      {xTickValues.map(tick => {
        const x = scalerX.scale(tick)
        const isGuide = xGridGuide && tick === xGridGuide
        if (tick === 0 && showLineAtZero) {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={0}
              x2={0}
              y1={0}
              y2={0}
            />
          )
        } else {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={x}
              x2={x}
              y1={0}
              y2={height}
            />
          )
        }
      })}
      {yTickValues.map(tick => {
        const y = scalerY.scale(tick)
        const isGuide = yGridGuide && tick === yGridGuide
        if (tick === 0 && showLineAtZero) {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={0}
              x2={0}
              y1={0}
              y2={0}
            />
          )
        } else {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={0}
              x2={width}
              y1={y}
              y2={y}
            />
          )
        }
      })}
    </g>
  )
}
