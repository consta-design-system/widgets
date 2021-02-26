import React, { useRef, useState } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { Position } from '@consta/uikit/Popover'
import { Tooltip } from '@consta/uikit/Tooltip'
import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array'
import { isDefined } from '@consta/widgets-utils/lib/type-guards'
import zip from 'lodash/zip'

import { TooltipContentForMultipleValues } from '@/__private__/components/TooltipContentForMultipleValues/TooltipContentForMultipleValues'
import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { numberFormatter } from '@/__private__/utils/formatters'

import {
  Data,
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  defaultSortValue,
  getChartSize,
  GetCirclesCount,
  getDonutMaxMinSizeRect,
  getDonutRadius,
  GetMinChartSize,
  getSizeDonut,
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
  LimitSizeSide,
  SortValue,
} from './helpers'
import './CoreDonutChart.css'
import {
  Data as DonutData,
  DataItem,
  Donut,
  HalfDonut,
} from './CoreDonutChartPie/CoreDonutChartPie'
import { CoreDonutChartText } from './CoreDonutChartText/CoreDonutChartText'

const cnCoreDonutChart = cn('CoreDonutChart')

type LineRadius = {
  outerRadius: number
  innerRadius: number
}

type TooltipDataState = ReadonlyArray<{
  value: number
  color: string
  name: string
}>

export type Props = {
  data: readonly Data[]
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
  filterTooltipItem?: (itemData: DataItem) => boolean
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
  const ref = useRef(null)
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

  const lineRadiuses: readonly LineRadius[] = createArrayOfIndexes(circlesCount).map(index => {
    const outerRadius = getDonutRadius({ mainRadius, index, circlesCount, chartSize: size })
    const innerRadius = outerRadius - sizeDonut

    return {
      outerRadius,
      innerRadius,
    }
  })

  const values = zip(
    ...data.map(item =>
      item.values.slice(0, circlesCount).map(itemValue => ({
        color: item.color,
        name: item.name,
        value: itemValue,
      }))
    )
  ) as readonly DonutData[]

  const isTextVisible = values.length === 1 && showText

  const handleMouseOver = showTooltip
    ? (d: DonutData) => {
        changeTooltipData(
          d.filter(filterTooltipItem).map(item => {
            const itemValue = isDefined(item.showValue) ? item.showValue : item.value

            return {
              value: itemValue,
              color: item.color,
              name: item.name,
            }
          })
        )
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

  return (
    <div
      ref={ref}
      className={cnCoreDonutChart()}
      style={{
        ...getDonutMaxMinSizeRect({
          height,
          width,
          minSize: minChartSize,
          isHalfHorizontal: isHalfDonutHorizontal,
          isHalfVertical: isHalfDonutVertical,
          limitSizeSide,
        }),
        ['--donut-width' as string]: `${sizeDonut}px`,
      }}
    >
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
          radius={lineRadiuses[0].innerRadius}
          halfDonut={halfDonut}
          lineWidth={sizeDonut}
        />
      )}
      <svg
        className={cnCoreDonutChart('Graph', { half: halfDonut ?? 'none' })}
        viewBox={viewBox}
        onMouseMove={handleMouseMove}
      >
        {values.map((d, index) => {
          const { outerRadius, innerRadius } = lineRadiuses[index]

          return (
            <Donut
              key={index}
              data={d.filter(isDefined)}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              isTooltipVisible={isTooltipVisible}
              halfDonut={halfDonut}
              sortValue={sortValue}
            />
          )
        })}
      </svg>
    </div>
  )
}
