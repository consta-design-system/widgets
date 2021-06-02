import React from 'react'

import * as d3 from 'd3'

import { cn } from '@/__private__/utils/bem'

import { Line } from '../Line/Line'
import { NotEmptyItem, ScaleLinear } from '../LinearChart'

import './Threshold.css'

const cnThreshold = cn('Threshold')

type Props = {
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  maxPoints: readonly NotEmptyItem[]
  minPoints?: readonly NotEmptyItem[]
  maxLabel?: string
  minLabel?: string
  lineClipPath?: string
}

export const THRESHOLD_COLOR = 'var(--color-bg-caution)'

export const getFillPoints = (
  maxPoints: readonly NotEmptyItem[],
  minPoints?: readonly NotEmptyItem[]
) => {
  if (!minPoints) {
    return []
  }

  const firstMaxPoint = maxPoints[0]
  const lastMinPoint = minPoints[minPoints.length - 1]

  return [
    ...maxPoints.slice(1),
    lastMinPoint,
    ...minPoints.slice(0, minPoints.length - 1).reverse(),
    firstMaxPoint,
  ]
}

export const isStraightLine = (items: readonly NotEmptyItem[], isHorizontal: boolean): boolean => {
  const getSecondaryValue = (item: NotEmptyItem) => item[isHorizontal ? 'y' : 'x']
  return items.every(item => getSecondaryValue(item) === getSecondaryValue(items[0]))
}

export const Threshold: React.FC<Props> = ({
  scaleX,
  scaleY,
  maxPoints,
  minPoints,
  maxLabel,
  minLabel,
  lineClipPath,
}) => {
  const getRectPath = d3
    .line<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y(({ y }) => scaleY(y))

  const fillPoints = getFillPoints(maxPoints, minPoints)
  const fillPath = getRectPath(fillPoints) || undefined

  const renderLine = (points: readonly NotEmptyItem[]) => (
    <Line
      className={cnThreshold('Line')}
      points={points}
      scaleX={scaleX}
      scaleY={scaleY}
      shapeRendering={isStraightLine(points, true) ? 'crispEdges' : undefined}
      transform={'translate(0, 0.5)'}
      stroke={THRESHOLD_COLOR}
    />
  )

  return (
    <g
      className={cnThreshold('Wrapper')}
      clipPath={lineClipPath}
      style={{ color: THRESHOLD_COLOR }}
    >
      {renderLine(maxPoints)}
      {maxLabel && (
        <g>
          <text
            className={cnThreshold('Label')}
            x={scaleX(maxPoints[maxPoints.length - 1].x)} // see is hidden by <defs> clipPath from LinearChart/Title.tsx
            y={scaleY(maxPoints[maxPoints.length - 1].y)} // see is hidden by <defs> clipPath from LinearChart/Title.tsx
          >
            {maxLabel}
          </text>
        </g>
      )}

      {minPoints && (
        <>
          <path className={cnThreshold('Fill')} d={fillPath} />
          {renderLine(minPoints)}
          {minLabel && (
            <text
              className={cnThreshold('Label')}
              x={scaleX(minPoints[minPoints.length - 1].x)} // see is hidden by <defs> clipPath from LinearChart/Title.tsx
              y={scaleY(minPoints[minPoints.length - 1].y)} // see is hidden by <defs> clipPath from LinearChart/Title.tsx
            >
              {minLabel}
            </text>
          )}
        </>
      )}
    </g>
  )
}
