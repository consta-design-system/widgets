import React, { forwardRef, SVGAttributes } from 'react'

import { Arc, PieArcDatum } from 'd3-shape'

import { cn } from '@/__private__/utils/bem'

import {
  ArcDataItem,
  EMPTY_PIE_ARC_DATUM,
  getArcAnglesByHalfDonut,
  HalfDonut,
  isEmptyPieArcDatum,
} from '../helpers'

import './CoreDonutChartPie.css'

const cnCoreDonutChartPie = cn('CoreDonutChartPie')

type MainElementProps = Omit<SVGAttributes<SVGGElement>, 'onMouseOver'>

type Props = MainElementProps & {
  data: ReadonlyArray<PieArcDatum<ArcDataItem>>
  renderArc: Arc<unknown, PieArcDatum<ArcDataItem>>
  isTransparent: boolean
  halfDonut?: HalfDonut
  onMouseOver: (data: ReadonlyArray<PieArcDatum<ArcDataItem>>) => void
}

const renderPath = (
  renderArc: Arc<unknown, PieArcDatum<ArcDataItem>>,
  item: PieArcDatum<ArcDataItem>,
  idx?: number
) => {
  return <path key={idx} d={renderArc(item) || undefined} fill={item.data.color} />
}

export const CoreDonutChartPie = forwardRef<SVGGElement, Props>((props, ref) => {
  const { data, renderArc, isTransparent, halfDonut, onMouseOver, ...mainElementProps } = props

  return (
    <g
      {...mainElementProps}
      ref={ref}
      className={cnCoreDonutChartPie({ isTransparent })}
      onMouseOver={() => onMouseOver(data)}
    >
      {isEmptyPieArcDatum(data)
        ? renderPath(renderArc, { ...EMPTY_PIE_ARC_DATUM, ...getArcAnglesByHalfDonut(halfDonut) })
        : data.map((item, idx) => renderPath(renderArc, item, idx))}
    </g>
  )
})
