import React, { CSSProperties, useRef, useState } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { Position } from '@consta/uikit/Popover'
import { Tooltip } from '@consta/uikit/Tooltip'
import { isDefined } from '@consta/widgets-utils/lib/type-guards'
import { PieArcDatum } from 'd3-shape'

import { TooltipContentForMultipleValues } from '@/__private__/components/TooltipContentForMultipleValues/TooltipContentForMultipleValues'
import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { numberFormatter } from '@/__private__/utils/formatters'

import {
  ArcDataItem,
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  defaultSortValue,
  DonutDataItem,
  getArcRadiuses,
  getChartSize,
  GetCirclesCount,
  getDonutMaxMinSizeRect,
  GetMinChartSize,
  getPieData,
  getRenderArc,
  getSizeDonut,
  getValues,
  HalfDonut,
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
  LimitSizeSide,
  SortValue,
} from './helpers'
import './CoreDonutChart.css'
import { CoreDonutChartPie } from './CoreDonutChartPie/CoreDonutChartPie'
import { CoreDonutChartText } from './CoreDonutChartText/CoreDonutChartText'

const cnCoreDonutChart = cn('CoreDonutChart')

type TooltipDataState = ReadonlyArray<{
  value: number | null
  color: string
  name: string
}>

export type Props = {
  data: readonly DonutDataItem[]
  showTooltip: boolean
  value?: string
  label?: string
  halfDonut?: HalfDonut
  limitSizeSide?: LimitSizeSide
  sortValue?: SortValue | null
  getCirclesCount?: GetCirclesCount
  getMinChartSize?: GetMinChartSize
  formatValue?: (value: string) => string
  formatLabel?: (label: string) => string
  formatValueForTooltip?: FormatValue
  filterTooltipItem?: (itemData: ArcDataItem) => boolean
}

type MainStyle = CSSProperties & {
  '--donut-width': string
}

export const CoreDonutChart: React.FC<Props> = ({
  data = [],
  showTooltip,
  halfDonut,
  value,
  label,
  limitSizeSide,
  sortValue = defaultSortValue,
  getCirclesCount = defaultGetCirclesCount,
  getMinChartSize = defaultGetMinChartSize,
  formatValue = numberFormatter,
  formatLabel = numberFormatter,
  formatValueForTooltip,
  filterTooltipItem = () => true,
}) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState>([])
  const [mousePosition, changeMousePosition] = useState<Position>()
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)

  const isHalfDonutHorizontal = getIsHalfDonutHorizontal(halfDonut)
  const isHalfDonutVertical = getIsHalfDonutVertical(halfDonut)
  const size = width && height ? getChartSize({ width, height, halfDonut }) : 0
  const mainRadius = size / 2
  const svgOffsetX = halfDonut === 'left' ? 0 : -mainRadius
  const svgOffsetY = halfDonut === 'top' ? 0 : -mainRadius
  const svgWidth = isHalfDonutVertical ? mainRadius : size
  const svgHeight = isHalfDonutHorizontal ? mainRadius : size
  const viewBox = `${svgOffsetX}, ${svgOffsetY}, ${svgWidth}, ${svgHeight}`
  const circlesCount = getCirclesCount(data)
  const showText = isDefined(value) || isDefined(label)
  const sizeDonut = getSizeDonut(circlesCount, size)
  const minChartSize = getMinChartSize(circlesCount, showText, halfDonut)
  const isTooltipVisible = Boolean(tooltipData.length)
  const arcRadiuses = getArcRadiuses({ mainRadius, circlesCount, sizeDonut, chartSize: size })
  const values = getValues(data, circlesCount)
  const isTextVisible = values.length === 1 && showText
  const piesData = values.map(item => getPieData(item, sortValue, halfDonut))
  const rendersArc = arcRadiuses.map(getRenderArc)

  const handleMouseOver = showTooltip
    ? (d: ReadonlyArray<PieArcDatum<ArcDataItem>>) => {
        changeTooltipData(d.filter(item => filterTooltipItem(item.data)).map(item => item.data))
      }
    : () => null

  const handleMouseOut = () => {
    changeTooltipData([])
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    changeMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const mainStyle: MainStyle = {
    ...getDonutMaxMinSizeRect({
      height,
      width,
      minSize: minChartSize,
      isHalfHorizontal: isHalfDonutHorizontal,
      isHalfVertical: isHalfDonutVertical,
      limitSizeSide,
    }),
    '--donut-width': `${sizeDonut}px`,
  }

  return (
    <div ref={ref} className={cnCoreDonutChart()} style={mainStyle}>
      {isTooltipVisible && (
        <Tooltip size="m" position={mousePosition} isInteractive={false}>
          <TooltipContentForMultipleValues
            items={tooltipData}
            formatValueForTooltip={formatValueForTooltip}
          />
        </Tooltip>
      )}
      {isTextVisible && showText && (
        <CoreDonutChartText
          className={cnCoreDonutChart('Text', { half: halfDonut ?? 'none' })}
          value={value ? formatValue(value) : value}
          label={label ? formatLabel(label) : label}
          radius={arcRadiuses[0].inner}
          halfDonut={halfDonut}
          lineWidth={sizeDonut}
        />
      )}
      <svg
        className={cnCoreDonutChart('Graph', { half: halfDonut ?? 'none' })}
        viewBox={viewBox}
        onMouseMove={handleMouseMove}
      >
        {piesData.map((pieData, index) => (
          <CoreDonutChartPie
            key={index}
            data={pieData}
            renderArc={rendersArc[index]}
            isTransparent={isTooltipVisible}
            halfDonut={halfDonut}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ))}
      </svg>
    </div>
  )
}
