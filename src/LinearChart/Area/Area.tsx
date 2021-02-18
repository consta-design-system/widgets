import React from 'react'
import { useUID } from 'react-uid'

import * as d3 from 'd3'

import { DirectionX, DirectionY } from '@/LinearChart/LinearChart'

import { NotEmptyItem, ScaleLinear } from '../LinearChart'

type Props = {
  values: readonly NotEmptyItem[]
  color: string
  scaleX: ScaleLinear
  scaleY: ScaleLinear
  areaBottom: number
  directionX?: DirectionX
  directionY: DirectionY
}

const getGradientDirection = ({
  directionX,
  directionY,
}: {
  directionX: DirectionX | undefined
  directionY: DirectionY
}) => {
  if (directionY === 'toBottom') {
    return {
      x1: '0%',
      y1: '100%',
      x2: '0%',
      y2: '0%',
    }
  }

  if (directionY === 'toTop') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
    }
  }

  if (directionX && directionX === 'toLeft') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '0%',
    }
  }

  if (directionX && directionX === 'toRight') {
    return {
      x1: '100%',
      y1: '0%',
      x2: '0%',
      y2: '0%',
    }
  }
}

export const Area: React.FC<Props> = ({
  values,
  color,
  scaleX,
  scaleY,
  areaBottom,
  directionX,
  directionY,
}) => {
  const uid = useUID()
  const linearGradientId = `line_area_${uid}`
  const area = d3
    .area<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y1(({ y }) => scaleY(y))
    .y0(scaleY(areaBottom))

  return (
    <>
      <linearGradient id={linearGradientId} {...getGradientDirection({ directionX, directionY })}>
        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
        {/* <stop offset="50%" stopColor={color} stopOpacity="0" y={0} />*/} //TODO
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
      <path
        d={area([...values]) || undefined}
        style={{
          fill: `url(#${linearGradientId})`,
        }}
      />
    </>
  )
}
