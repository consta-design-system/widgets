import React, { RefObject, useRef, useState } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { Text } from '@consta/uikit/Text'

import { Grid } from '@/__private__/components/Grid/Grid'
import { FormatGroupName, FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { NumberRange, scaleLinear } from '@/__private__/utils/scale'
import { getTicks } from '@/__private__/utils/ticks'

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
  useGridStyle,
} from './helpers'
import {
  defaultRenderAxisValues,
  defaultRenderGroupsLabels,
  RenderAxisValues,
  RenderGroup,
  RenderGroupsLabels,
} from './renders'
import './CoreBarChart.css'
import { CoreBarChartThreshold } from './CoreBarChartThreshold/CoreBarChartThreshold'
import { Position } from './CoreBarChartTicks/CoreBarChartTicks'
import { CoreBarChartTooltip, TooltipData } from './CoreBarChartTooltip/CoreBarChartTooltip'
import { CoreBarChartZeroLine } from './CoreBarChartZeroLine/CoreBarChartZeroLine'

const cnCoreBarChart = cn('CoreBarChart')

const SHADOW_WIDTH = 20

export type OnMouseEventColumn = (groupName: string) => void

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
  gridConfig?: number
  isHorizontal?: boolean
  showValues?: boolean
  showReversed?: boolean
  showGrid?: boolean
  showGuide?: boolean
  showGroupsLabels?: boolean
  maxColumnLength: number
  minReversedColumnLength?: number
  maxNumberGroups: number
  isXAxisLabelsSlanted?: boolean
  unit?: string
  activeSectionIndex?: number
  activeGroup?: string
  threshold?: Threshold
  renderGroup: RenderGroup<T>
  getAxisShowPositions?: GetAxisShowPositions
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  formatGroupName?: FormatGroupName
  renderGroupsLabels?: RenderGroupsLabels
  renderAxisValues?: RenderAxisValues
  onMouseEnterColumn?: OnMouseEventColumn
  onMouseLeaveColumn?: OnMouseEventColumn
  onMouseClickColumn?: OnMouseEventColumn
  limitMinimumStepSize?: boolean
}

const renderUnit = (className: string, unit: string, unitRef?: RefObject<HTMLDivElement>) => (
  <Text as="div" size={'xs'} view="secondary" className={className} ref={unitRef}>
    {unit}
  </Text>
)

export const CoreBarChart = <T,>(props: Props<T>) => {
  const {
    groupsDomain,
    valuesDomain,
    groups,
    isHorizontal = false,
    showValues = false,
    showReversed = false,
    showGrid = true,
    showGuide = true,
    showGroupsLabels = true,
    maxColumnLength,
    minReversedColumnLength,
    maxNumberGroups,
    unit,
    activeSectionIndex,
    activeGroup,
    threshold,
    getAxisShowPositions = defaultGetAxisShowPositions,
    formatValueForLabel = String,
    formatValueForTooltip,
    formatGroupName,
    renderGroup,
    renderAxisValues = defaultRenderAxisValues,
    renderGroupsLabels = defaultRenderGroupsLabels,
    isXAxisLabelsSlanted,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onMouseClickColumn,
    limitMinimumStepSize,
    gridConfig,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const axisRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const unitRef = useRef<HTMLDivElement>(null)
  const groupsRef = useRef([React.createRef<HTMLDivElement>(), React.createRef<HTMLDivElement>()])
  /**
   * Используется как триггер, чтобы при ресайзе окна мы делали перерасчет всех элементов
   */
  const { width, height } = useComponentSize(ref)
  const [showLeftShadow, setShowLeftShadow] = React.useState<boolean>(false)
  const [showRightShadow, setShowRightShadow] = React.useState<boolean>(false)

  const [tooltipData, setTooltipData] = useState<TooltipData>()
  const [maxLabelSize, setMaxLabelSize] = useState<LabelSize>({
    width: 0,
    height: 0,
  })
  const numberGridTicks = Math.round(isHorizontal && width && height ? width / 50 : height / 50)
  const [gridTicks, setGridTicks] = useState<number>(gridConfig ? gridConfig : numberGridTicks)
  const getNumberGridTicks = (length: number) => {
    if (length && !gridConfig) {
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
    if (isHorizontal && showValues && !isColumnOverflow) {
      return maxLabelSize.width
    } else if (isHorizontal && isColumnOverflow) {
      return maxLabelSize.width + 14
    } else {
      return 0
    }
  }
  const getPaddingTop = () => {
    if (!isHorizontal && showValues && !isColumnOverflow) {
      return maxLabelSize.height
    } else if (!isHorizontal && isColumnOverflow) {
      return maxLabelSize.height + 8
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

  const gridStyle = useGridStyle({
    paddingRight,
    paddingLeft,
    paddingTop,
    paddingBottom,
    ref,
    isHorizontal,
    width,
    height,
    groupsRef,
  })

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

  const getRenderGroupsLabels = (position: Position) =>
    renderGroupsLabels({
      values: groupsDomain,
      position,
      isXAxisLabelsSlanted,
      showGroupsLabels,
      getGridAreaName: getLabelGridAreaName(position),
      formatGroupName,
    })

  const getRenderAxisValues = (position: Position) => (
    <div
      ref={axisRef}
      className={cnCoreBarChart('AxisTicks', { position })}
      style={
        ['top', 'bottom'].includes(position)
          ? { marginLeft: `${gridStyle.left}px` }
          : verticalStyles && { paddingTop }
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

  const paddingThreshold = getPaddingThreshold(isHorizontal, threshold)

  const unitRefHeight = unitRef?.current?.getBoundingClientRect()?.height
  const refHeight = ref?.current?.getBoundingClientRect()?.height
  const axisRefWidth = axisRef?.current?.getBoundingClientRect()?.width

  const svgRightRef = svgRef?.current?.getBoundingClientRect()?.right
  const scrollRightRef = scrollRef?.current?.getBoundingClientRect()?.right
  const svgLeftRef = svgRef?.current?.getBoundingClientRect()?.left
  const scrollLeftRef = scrollRef?.current?.getBoundingClientRect()?.left

  const graphWithScrollHeight = refHeight && unitRefHeight && refHeight - unitRefHeight

  React.useEffect(() => {
    if (svgRightRef && scrollRightRef && svgRightRef > scrollRightRef) {
      setShowRightShadow(true)
    }
    if (svgRightRef && scrollRightRef && Math.round(svgRightRef) === Math.round(scrollRightRef)) {
      setShowRightShadow(false)
    }
    if (svgLeftRef && scrollLeftRef && Math.round(svgLeftRef) === Math.round(scrollLeftRef)) {
      setShowLeftShadow(false)
    }
  }, [svgRightRef, scrollRightRef, svgLeftRef, scrollLeftRef])

  const handleScroll = () => {
    const { left: scrollLeft, right: scrollRight } = scrollRef.current!.getBoundingClientRect()
    const { left: svgLeft, right: svgRight } = svgRef.current!.getBoundingClientRect()

    if (axisRefWidth && svgLeft - axisRefWidth - 8 < scrollLeft) {
      setShowLeftShadow(true)
    } else {
      setShowLeftShadow(false)
    }

    if (svgRight > scrollRight) {
      setShowRightShadow(true)
    } else {
      setShowRightShadow(false)
    }
  }

  /**
   * Из за различий в построении осей для горизонтального и вертикального режима
   * пришлось задублировать рендер axisShowPositions
   * Для isHorizontal рендерится вне обертки с барчартом, чтобы при скролле ось оставалась на месте.
   * Для !isHorizontal рендерится внутри обертки, для того, чтобы лейблы строились по grid сетке.
   */

  return (
    <div
      className={cnCoreBarChart('Scroll')}
      style={{
        ['--shadow-width' as string]: `${SHADOW_WIDTH}px`,
        ['--shadow-height' as string]: `${graphWithScrollHeight && graphWithScrollHeight + 16}px`,
        ['--shadow-left-offset' as string]: `${scrollLeftRef &&
          axisRefWidth &&
          scrollLeftRef + axisRefWidth - 1}px`,
        ['--shadow-top-offset' as string]: `${ref?.current?.getBoundingClientRect()?.top}px`,
        ['--shadow-padding-top-offset' as string]: `${
          unitRef?.current?.getBoundingClientRect()?.height
        }px`,
        ['--shadow-right-offset' as string]: `${scrollRef?.current?.getBoundingClientRect()
          ?.right && scrollRef?.current?.getBoundingClientRect()?.right - 20}px`,
        ['--unit-width' as string]: `${axisRef?.current?.getBoundingClientRect()?.width}px`,
      }}
      onScroll={handleScroll}
      ref={scrollRef}
    >
      <div className={cnCoreBarChart('Wrapper')}>
        <div className={cnCoreBarChart('Main')}>
          {isHorizontal && axisShowPositions.top && renderHorizontal('top')}
          <div
            ref={ref}
            className={cnCoreBarChart('Chart', { isHorizontal, paddingThreshold })}
            style={{
              ...getGridSettings({
                isHorizontal,
                countGroups: groups.length,
                axisShowPositions,
              }),
            }}
          >
            <svg className={cnCoreBarChart('Svg')} ref={svgRef} style={{ ...gridStyle }}>
              {showGrid && showGuide && (
                <Grid
                  scalerX={valuesScale}
                  scalerY={valuesScale}
                  xTickValues={gridXTickValues}
                  yTickValues={gridYTickValues}
                  width={gridStyle.width}
                  height={gridStyle.height}
                  showGuide={showGuide}
                />
              )}
              {showGuide && (
                <CoreBarChartZeroLine valuesScale={valuesScale} isHorizontal={isHorizontal} />
              )}
            </svg>
            {threshold && (
              <svg
                className={cnCoreBarChart('Svg', { threshold: threshold?.value ? 'up' : '' })}
                style={
                  isHorizontal
                    ? {
                        width: '1px',
                        height: gridStyle.height,
                        left: gridStyle.left,
                        top: gridStyle.top,
                      }
                    : {
                        height: '1px',
                        width: gridStyle.width,
                        left: gridStyle.left,
                        top: gridStyle.top,
                      }
                }
              >
                <CoreBarChartThreshold
                  valuesScale={valuesScale}
                  isHorizontal={isHorizontal}
                  value={threshold.value}
                />
              </svg>
            )}
            {unit &&
              !isHorizontal &&
              renderUnit(cnCoreBarChart('Unit', { position: 'topLeft' }), unit, unitRef)}
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
                    onMouseClickColumn,
                    formatValueForLabel,
                    onChangeLabelSize: changeLabelSize,
                    getNumberGridTicks,
                    gridDomain,
                    limitMinimumStepSize,
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
            <CoreBarChartTooltip
              data={tooltipData}
              isHorizontal={isHorizontal}
              formatValue={formatValueForTooltip || formatValueForLabel}
            />
          )}
          {showLeftShadow && <div className={cnCoreBarChart('Shadow', { left: true })} />}
          {showRightShadow && <div className={cnCoreBarChart('Shadow', { right: true })} />}
        </div>
      </div>
    </div>
  )
}
