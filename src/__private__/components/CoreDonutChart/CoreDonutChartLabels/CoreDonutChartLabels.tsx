import React, { forwardRef, SVGAttributes } from 'react'

import { PieArcDatum } from 'd3-shape'

import { cn } from '@/__private__/utils/bem'

import {
  ArcDataItem,
  cropArcLabel,
  FormatArcLabel,
  getArcMiddleInRadian,
  getRendersLabels,
  getSvgTextAnchor,
  getSvgTextDY,
  HalfDonut,
  LABEL_LINE_OFFSET,
  LABEL_LINE_WIDTH,
  radianToDegree,
} from '../helpers'

import './CoreDonutChartLabels.css'

const cnCoreDonutChartLabels = cn('CoreDonutChartLabels')

type MainElementProps = SVGAttributes<SVGGElement>

type Props = MainElementProps & {
  data: ReadonlyArray<PieArcDatum<ArcDataItem>>
  radius: number
  halfDonut?: HalfDonut
  formatArcLabel: FormatArcLabel
}

export const CoreDonutChartLabels = forwardRef<SVGGElement, Props>((props, ref) => {
  const { data, radius, halfDonut, formatArcLabel, ...mainElementProps } = props
  const { startLine, endLine, startLabel } = getRendersLabels({
    radius,
    lineWidth: LABEL_LINE_WIDTH,
    labelOffset: LABEL_LINE_OFFSET,
  })

  return (
    <g {...mainElementProps} ref={ref}>
      {data.map((item, itemIdx) => {
        const [startX, startY] = startLine(item)
        const [endX, endY] = endLine(item)
        const [textX, textY] = startLabel(item)
        const degrees = radianToDegree(getArcMiddleInRadian(item))

        return (
          <React.Fragment key={itemIdx}>
            <line
              className={cnCoreDonutChartLabels('Line')}
              x1={startX}
              x2={endX}
              y1={startY}
              y2={endY}
            />
            <text
              key={itemIdx}
              className={cnCoreDonutChartLabels('Label')}
              x={textX}
              y={textY}
              dy={getSvgTextDY(degrees)}
              textAnchor={getSvgTextAnchor(degrees, halfDonut)}
            >
              {cropArcLabel(formatArcLabel(item.data))}
            </text>
          </React.Fragment>
        )
      })}
    </g>
  )
})
