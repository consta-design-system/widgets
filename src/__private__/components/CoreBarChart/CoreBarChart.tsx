import React, { useLayoutEffect, useRef, useState } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { Text } from '@consta/uikit/Text'

import { ZeroLine } from '@/__private__/components/CoreBarChart/ZeroLine/ZeroLine'
import { Grid } from '@/__private__/components/Grid/Grid'
import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { NumberRange, scaleLinear } from '@/__private__/utils/scale'
import { getTicks } from '@/__private__/utils/ticks'

import { Title } from '../Title/Title'

import {
  CHART_MIN_HEIGHT,
  defaultGetAxisShowPositions,
  GetAxisShowPositions,
  getColumnLength,
  getGridSettings,
  getLabelGridAreaName,
  getPaddingThreshold,
  getRange,
  getScaler,
} from './helpers'
import {
  defaultRenderAxisValues,
  defaultRenderGroupsLabels,
  RenderAxisValues,
  RenderGroup,
  RenderGroupsLabels,
} from './renders'
import './CoreBarChart.css'
import { Threshold } from './Threshold/Threshold'
import { Position } from './Ticks/Ticks'
import { Tooltip, TooltipData } from './Tooltip/Tooltip'

const cnCoreBarChart = cn('CoreBarChart')

export type OnMouseHoverColumn = (groupName: string) => void

export type Threshold = {
  value: number
}

export type LabelSize = {
  width: number
  height: number
}

export type Props<T> = {
  groupsDomain: readonly string[]
  valuesDomain: NumberRange
  groups: readonly T[]
  isHorizontal?: boolean
  withScroll?: boolean
  showValues?: boolean
  showReversed?: boolean
  showGrid?: boolean
  showLineAtZero?: boolean
  showGroupsLabels?: boolean
  maxColumnLength: number
  minReversedColumnLength?: number
  maxNumberGroups: number
  isXAxisLabelsSlanted?: boolean
  unit?: string
  activeSectionIndex?: number
  activeGroup?: string
  threshold?: Threshold
  title?: React.ReactNode
  renderGroup: RenderGroup<T>
  getAxisShowPositions?: GetAxisShowPositions
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  renderGroupsLabels?: RenderGroupsLabels
  renderAxisValues?: RenderAxisValues
  onMouseEnterColumn?: OnMouseHoverColumn
  onMouseLeaveColumn?: OnMouseHoverColumn
  limitMinimumCategorySize?: boolean
}

const renderUnit = (className: string, unit: string) => (
  <Text as="div" size={'xs'} view="secondary" className={className}>
    {unit}
  </Text>
)

export const CoreBarChart = <T,>(props: Props<T>) => {
  const {
    groupsDomain,
    valuesDomain,
    groups,
    isHorizontal = false,
    withScroll = false,
    showValues = false,
    showReversed = false,
    showGrid = true,
    showLineAtZero = true,
    showGroupsLabels = true,
    maxColumnLength,
    minReversedColumnLength,
    maxNumberGroups,
    unit,
    activeSectionIndex,
    activeGroup,
    threshold,
    title,
    getAxisShowPositions = defaultGetAxisShowPositions,
    formatValueForLabel = String,
    formatValueForTooltip,
    renderGroup,
    renderAxisValues = defaultRenderAxisValues,
    renderGroupsLabels = defaultRenderGroupsLabels,
    isXAxisLabelsSlanted,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    limitMinimumCategorySize,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const svgRef = useRef(null)
  const groupsRef = useRef([React.createRef<HTMLDivElement>(), React.createRef<HTMLDivElement>()])
  /**
   * Используется как триггер, чтобы при ресайзе окна мы делали перерасчет всех элементов
   */
  const { width, height } = useComponentSize(ref)
  const [gridStyle, changeGridStyle] = useState({ width: 0, height: 0, left: 0, top: 0 })
  const [tooltipData, setTooltipData] = useState<TooltipData>()
  const [maxLabelSize, setMaxLabelSize] = useState<LabelSize>({
    width: 0,
    height: 0,
  })
  const numberGridTicks = Math.round(isHorizontal && width && height ? width / 50 : height / 50)
  const [gridTicks, setGridTicks] = useState<number>(numberGridTicks)
  const getNumberGridTicks = (length: number) => {
    if (length) {
      setGridTicks(Math.round(length / 50))
    }
  }
  const gridItems = getTicks(valuesDomain, gridTicks)
  const gridDomain: NumberRange = [gridItems[0], gridItems[gridItems.length - 1]]
  const axisValues = gridItems
  const isColumnOverflow =
    (!showReversed && gridDomain[1] < maxColumnLength) ||
    (showReversed && minReversedColumnLength && gridDomain[0] > minReversedColumnLength)

  const getPaddingRight = () => {
    if (isHorizontal && showValues) {
      return maxLabelSize.width
    } else if (isHorizontal && isColumnOverflow) {
      return maxLabelSize.width + 10
    } else {
      return 0
    }
  }
  const getPaddingTop = () => {
    if (!isHorizontal && showValues) {
      return maxLabelSize.height
    } else if (!isHorizontal && isColumnOverflow) {
      return maxLabelSize.height + 10
    } else {
      return 0
    }
  }
  const paddingRight = getPaddingRight()
  const paddingLeft = showReversed ? paddingRight : 0
  const paddingTop = getPaddingTop()
  const paddingBottom = showReversed ? paddingTop : 0

  const scalerMaxValue = getScaler(gridItems[gridItems.length - 1])
  const scalerMinValue = getScaler(Math.abs(gridItems[0]))

  const valuesScale = scaleLinear({
    domain: [gridItems[0], gridItems[gridItems.length - 1]],
    range: getRange(
      isHorizontal ? Math.round(gridStyle.width) : Math.round(gridStyle.height),
      !isHorizontal
    ),
  })

  const gridXTickValues = isHorizontal ? gridItems : []
  const gridYTickValues = isHorizontal ? [] : gridItems
  const axisShowPositions = getAxisShowPositions({ isHorizontal, showReversed })
  const horizontalStyles = {
    paddingLeft,
    paddingRight,
  }
  const verticalStyles = {
    paddingTop,
    paddingBottom,
  }

  const handleMouseEnterColumn = (groupName: string, params: TooltipData) => {
    setTooltipData(params)

    onMouseEnterColumn && onMouseEnterColumn(groupName)
  }

  const handleMouseLeaveColumn = (groupName: string) => {
    setTooltipData(undefined)

    onMouseLeaveColumn && onMouseLeaveColumn(groupName)
  }

  const changeLabelSize = (labelSize: LabelSize) => {
    if (maxLabelSize.width >= labelSize.width && maxLabelSize.height >= labelSize.height) {
      return
    }

    setMaxLabelSize({
      width: labelSize.width,
      height: labelSize.height,
    })
  }

  useLayoutEffect(() => {
    const firstGroup = groupsRef.current[0].current
    // Если группа всего одна, то считаем её как первую и как последнюю
    const lastGroup = groupsRef.current[1].current || groupsRef.current[0].current

    if (ref && ref.current && firstGroup && lastGroup) {
      const left =
        firstGroup.getBoundingClientRect().left - ref.current.getBoundingClientRect().left
      const top = firstGroup.getBoundingClientRect().top - ref.current.getBoundingClientRect().top
      const newHeight =
        lastGroup.getBoundingClientRect().bottom - firstGroup.getBoundingClientRect().top
      const newWidth =
        lastGroup.getBoundingClientRect().right - firstGroup.getBoundingClientRect().left

      changeGridStyle({
        left: left + paddingLeft,
        top: top + paddingTop,
        height: newHeight - paddingTop - paddingBottom,
        width: newWidth - paddingLeft - paddingRight,
      })
    }
  }, [
    ref,
    isHorizontal,
    width,
    height,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    groupsRef,
  ])

  const getRenderGroupsLabels = (position: Position) =>
    renderGroupsLabels({
      values: groupsDomain,
      position,
      getGridAreaName: getLabelGridAreaName(position),
      isXAxisLabelsSlanted,
      showGroupsLabels,
    })

  const getRenderAxisValues = (position: Position) => (
    <div
      className={cnCoreBarChart('AxisTicks', { position })}
      style={
        ['top', 'bottom'].includes(position)
          ? { marginLeft: `${gridStyle.left}px` }
          : verticalStyles
      }
    >
      {renderAxisValues({
        values: axisValues,
        scaler: valuesScale,
        position,
        formatValueForLabel,
      })}
    </div>
  )

  const renderHorizontal = isHorizontal ? getRenderAxisValues : getRenderGroupsLabels
  const renderVertical = isHorizontal ? getRenderGroupsLabels : getRenderAxisValues

  const columnLength = getColumnLength(maxColumnLength, gridItems[gridItems.length - 1], 'columns')
  const reversedColumnLength =
    minReversedColumnLength &&
    getColumnLength(minReversedColumnLength, gridItems[0], 'reversedColumns')
  /**
   * Из за различий в построении осей для горизонтального и вертикального режима
   * пришлось задублировать рендер axisShowPositions
   * Для isHorizontal рендерится вне обертки с барчартом, чтобы при скролле ось оставалась на месте.
   * Для !isHorizontal рендерится внутри обертки, для того, чтобы лейблы строились по grid сетке.
   */
  return (
    <div className={cnCoreBarChart('Scroll')}>
      <div className={cnCoreBarChart('Wrapper')}>
        <Title style={{ paddingLeft: gridStyle.left }}>{title}</Title>
        <div className={cnCoreBarChart('Main', { withVerticalScroll: withScroll && isHorizontal })}>
          {isHorizontal && axisShowPositions.top && renderHorizontal('top')}
          <div
            ref={ref}
            className={cnCoreBarChart('Chart', { isHorizontal })}
            style={{
              ...getGridSettings({
                isHorizontal,
                countGroups: groups.length,
                axisShowPositions,
              }),
              ...getPaddingThreshold(isHorizontal, threshold),
            }}
          >
            <svg className={cnCoreBarChart('Svg')} ref={svgRef} style={gridStyle}>
              {showGrid && showLineAtZero && (
                <Grid
                  scalerX={valuesScale}
                  scalerY={valuesScale}
                  xTickValues={gridXTickValues}
                  yTickValues={gridYTickValues}
                  width={gridStyle.width}
                  height={gridStyle.height}
                />
              )}
              {showLineAtZero && <ZeroLine valuesScale={valuesScale} isHorizontal={isHorizontal} />}
              {threshold && (
                <Threshold
                  valuesScale={valuesScale}
                  isHorizontal={isHorizontal}
                  value={threshold.value}
                />
              )}
            </svg>
            {unit &&
              !isHorizontal &&
              renderUnit(cnCoreBarChart('Unit', { position: 'topLeft' }), unit)}
            {!isHorizontal && axisShowPositions.top && showGroupsLabels && renderHorizontal('top')}
            {axisShowPositions.right && showGroupsLabels && renderVertical('right')}
            {groups.map((group, groupIdx) => {
              const isFirstGroup = groupIdx === 0
              const isLastGroup = groupIdx === groups.length - 1
              return (
                <div
                  key={groupIdx}
                  ref={
                    isFirstGroup || isLastGroup
                      ? groupsRef.current[isFirstGroup ? 0 : 1]
                      : undefined
                  }
                  style={{
                    gridArea: `group${groupIdx}`,
                    minHeight: !isHorizontal ? CHART_MIN_HEIGHT : undefined,
                    ...horizontalStyles,
                    ...verticalStyles,
                  }}
                  className={cnCoreBarChart('GroupWrapper')}
                >
                  {renderGroup({
                    item: group,
                    index: groupIdx,
                    isLast: isLastGroup,
                    isFirst: isFirstGroup,
                    showValues,
                    showReversed,
                    isHorizontal,
                    activeGroup,
                    activeSectionIndex,
                    columnLength,
                    reversedColumnLength,
                    maxNumberGroups,
                    scalerMaxValue,
                    scalerMinValue,
                    onMouseEnterColumn: handleMouseEnterColumn,
                    onMouseLeaveColumn: handleMouseLeaveColumn,
                    formatValueForLabel,
                    onChangeLabelSize: changeLabelSize,
                    getNumberGridTicks,
                    gridDomain,
                    limitMinimumCategorySize,
                    maxLabelSize,
                  })}
                </div>
              )
            })}
            {axisShowPositions.left && showGroupsLabels && renderVertical('left')}
            {!isHorizontal &&
              axisShowPositions.bottom &&
              showGroupsLabels &&
              renderHorizontal('bottom')}
          </div>
          {isHorizontal &&
            axisShowPositions.bottom &&
            showGroupsLabels &&
            renderHorizontal('bottom')}
          {unit && isHorizontal && renderUnit(cnCoreBarChart('Unit', { position: 'bottom' }), unit)}
          {tooltipData && (
            <Tooltip
              data={tooltipData}
              isHorizontal={isHorizontal}
              formatValue={formatValueForTooltip || formatValueForLabel}
            />
          )}
        </div>
      </div>
    </div>
  )
}
