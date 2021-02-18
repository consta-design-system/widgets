import React from 'react'

import * as d3 from 'd3'

import { cn } from '@/__private__/utils/bem'

import './CoreDonutChartPie.css'

const cnCoreDonutChartPie = cn('CoreDonutChartPie')

export type DataItem = {
  value: number
  color: string
  name: string
  showValue?: number
}

export type Data = readonly DataItem[]

export const halvesDonut = ['top', 'left', 'right', 'bottom'] as const

export type HalfDonut = typeof halvesDonut[number]

type Props = {
  data: Data
  innerRadius: number
  outerRadius: number
  handleMouseOver: (data: Data) => void
  handleMouseOut: () => void
  isTooltipVisible: boolean
  halfDonut?: HalfDonut
}

/**
 * Отступ между D3.arc элементами, указывается в пикселях.
 */
const ARC_PAD = 1
const ARC_RADIUS = 100

const fullCircleAngle = {
  startAngle: 0,
  endAngle: 2 * Math.PI,
}

const getAnglesByHalfDonut = (halfDonut?: HalfDonut) => {
  switch (halfDonut) {
    case 'top': {
      return {
        startAngle: Math.PI * 1.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'right': {
      return {
        startAngle: 2 * Math.PI,
        endAngle: Math.PI,
      }
    }
    case 'bottom': {
      return {
        startAngle: Math.PI * -0.5,
        endAngle: Math.PI * 0.5,
      }
    }
    case 'left': {
      return {
        startAngle: 0,
        endAngle: Math.PI,
      }
    }
    default: {
      return fullCircleAngle
    }
  }
}

const isEmpty = (pieData: ReadonlyArray<Omit<DataItem, 'color' | 'name'>>) => {
  return pieData.map(pieDatum => pieDatum.value).every(value => value === 0)
}

export const Donut: React.FC<Props> = ({
  data,
  innerRadius,
  outerRadius,
  handleMouseOver,
  handleMouseOut,
  isTooltipVisible,
  halfDonut,
}) => {
  const { startAngle, endAngle } = getAnglesByHalfDonut(halfDonut)

  const pieData = d3
    .pie<DataItem>()
    .sort(null)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .value(d => d.value)([...data])

  const arc = d3
    .arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    /**
     * padAngle для каждого D3.arc расчитывается по формуле:
     *
     * `padRadius * [переданное значение]`
     *
     * https://github.com/d3/d3-shape#arc_padAngle
     */
    .padAngle(ARC_PAD / ARC_RADIUS)
    /**
     * Указывается специфичный радиус для правильного расчета `padAngle`, если
     * не указать значение или указать `null`, то расчет этого параметра
     * производится по формуле:
     *
     * `sqrt(innerRadius * innerRadius + outerRadius * outerRadius)`
     *
     * Т.е. для каждого вложенного компонента Donut, размер отступа будет меньше
     * чем у предыдущего, чтобы это исправить указываем фиксированное значение
     * которое исправляет расчеты.
     *
     * https://github.com/d3/d3-shape#arc_padRadius
     */
    .padRadius(ARC_RADIUS)

  return (
    <g
      className={cnCoreDonutChartPie({ isTransparent: isTooltipVisible })}
      onMouseOver={() => handleMouseOver(data)}
      onMouseOut={handleMouseOut}
    >
      {isEmpty(pieData) ? (
        <path
          d={arc({ ...pieData[0], ...fullCircleAngle }) || undefined}
          fill="var(--color-bg-ghost)"
        />
      ) : (
        pieData.map((pieDatum, idx) => (
          <path key={idx} d={arc(pieDatum) || undefined} fill={pieDatum.data.color} />
        ))
      )}
    </g>
  )
}
