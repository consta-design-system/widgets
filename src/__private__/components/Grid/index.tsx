import React from 'react'

import classnames from 'classnames'

import { Scaler } from '@/__private__/utils/scale'

import css from './index.css'

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
  <g className={css.main}>
    {xTickValues.map(tick => {
      const x = scalerX.scale(tick)
      const isGuide = xGridGuide && tick === xGridGuide

      return (
        <line
          key={tick}
          className={classnames(css.line, isGuide && css.guide)}
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
          className={classnames(css.line, isGuide && css.guide)}
          x1={0}
          x2={width}
          y1={y}
          y2={y}
        />
      )
    })}
  </g>
)
