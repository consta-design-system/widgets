import React from 'react'
import { useUID } from 'react-uid'

import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { Direction as LegendDirection, Items as LegendItems, Legend } from '@/Legend/Legend'
import {
  LabelPosition as LegendLabelPosition,
  LabelType as LegendType,
  Size as LegendSize,
} from '@/LegendItem/LegendItem'
import {
  flipPointsOnAxes,
  getDomainWithLimits,
  getMainTickValues,
  getSecondaryTickValues,
  getXScale,
  getYScale,
  INITIAL_DOMAIN,
  padDomain,
} from '@/LinearChart/helpers'
import { Frame, GridConfig, UNIT_Y_MARGIN } from '@/LinearChart/Frame/Frame'
import { HoverDots } from '@/LinearChart/HoverDots/HoverDots'
import { HoverLines } from '@/LinearChart/HoverLines/HoverLines'
import { LineTooltip } from '@/LinearChart/LineTooltip/LineTooltip'
import { LineWithDots } from '@/LinearChart/LineWithDots/LineWithDots'

import './LinearChart.css'
import { Threshold } from './Threshold/Threshold'

const cnLinearChart = cn('LinearChart')

export type Item = { x: number | null; y: number | null }
export type NotEmptyItem = { x: number; y: number }
export const itemIsNotEmpty = (item: Item): item is NotEmptyItem =>
  isNotNil(item.x) && isNotNil(item.y)
export type NumberRange = readonly [number, number]
export type TickValues = readonly number[]
export type ScaleLinear = d3.ScaleLinear<number, number>
export const directionsX = ['toRight', 'toLeft'] as const
export type DirectionX = typeof directionsX[number]
export const directionsY = ['toTop', 'toBottom'] as const
export type DirectionY = typeof directionsY[number]
export const axes = ['x', 'y'] as const
export type Axis = typeof axes[number]
export const legendPositions = ['top', 'bottom'] as const
export type LegendPosition = typeof legendPositions[number]
export const legendAligns = ['left', 'center', 'right'] as const
export type LegendAlign = typeof legendAligns[number]
export const tooltipVariants = ['line', 'dot'] as const
export type TooltipVariant = typeof tooltipVariants[number]
export type Line = {
  values: readonly Item[]
  dots?: boolean
  dashed?: boolean
  withGradient?: boolean
  lineName: string
  color: string
} & (
  | {
      showValues?: false
    }
  | {
      showValues?: true
      formatValueForDot?: FormatValue
    }
)

type ThresholdLine = {
  name?: string
  label?: string
  values: readonly NotEmptyItem[]
}
export type Threshold = {
  max: ThresholdLine
  min?: ThresholdLine
}

export type HoveredMainValue = number | undefined
export type HoveredDotValue = NotEmptyItem | undefined

type LegendProps = {
  items: LegendItems
  position?: LegendPosition
  align?: LegendAlign
}

type Props = {
  lines: Line[]
  gridConfig: GridConfig
  threshold?: Threshold
  legend?: LegendProps
  yDimensionUnit?: string
  yLabelsShowInPercent?: boolean
  xLabelsShowVertical?: boolean
  xHideFirstLabel?: boolean
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  formatValueForTooltipTitle?: FormatValue
  onClickHoverLine?: (value: number) => void
  onClickHoverDot?: (value: Item) => void
  limitMinimumStepSize?: boolean
  tooltipVariant?: TooltipVariant
}

type State = {
  xDomain: NumberRange
  yDomain: NumberRange
  width: number
  height: number
  paddingX: number
  paddingY: number
  xGuideValue: number
  yGuideValue: number
}

const DOT_SIZE = 5
const SCROLL_OFFSET = 38
const MIN_STEP_SIZE = 30
const TRANSITION_SIZE = 600

// const positionLegendClass = {
//   top: css.legendTop,
//   bottom: css.legendBottom,
// }
//
// const alignLegendClass = {
//   left: css.legendLeft,
//   center: css.legendCenter,
//   right: css.legendRight,
// }

export const domainPaddings = {
  top: 0.055,
  right: 0.06,
  bottom: 0,
  left: 0,
}

export const LinearChart: React.FC<Props> = props => {
  const {
    lines,
    gridConfig,
    yDimensionUnit,
    yLabelsShowInPercent = false,
    xLabelsShowVertical = false,
    xHideFirstLabel = false,
    formatValueForLabel = String,
    formatValueForTooltip,
    formatValueForTooltipTitle,
    legend,
    onClickHoverLine,
    onClickHoverDot,
    limitMinimumStepSize = false,
    tooltipVariant = tooltipVariants[0],
  } = props

  const [state, setState] = React.useState<State>({
    xDomain: INITIAL_DOMAIN,
    yDomain: INITIAL_DOMAIN,
    width: 0,
    height: 0,
    paddingX: 0,
    paddingY: 0,
    xGuideValue: 0,
    yGuideValue: 0,
  })
  const [hoveredMainValue, setHoveredMainValue] = React.useState<HoveredMainValue>(undefined)
  const [hoveredDotValue, setHoveredDotValue] = React.useState<HoveredDotValue>(undefined)
  const ref = React.createRef<HTMLDivElement>()
  const svgWrapperRef = React.useRef<SVGSVGElement>(null)
  const paddingTransitionEl = {} as Element
  const uid = useUID()
  const dotRadius = DOT_SIZE / 2
  const lineClipId = `line_clipPath_${uid}`
  const dotsClipId = `dots_clipPath_${uid}`

  const getAllValues = (): readonly Item[] => _.flatten(lines.map((l: Line) => l.values))

  const getXDomain = (items: readonly Item[]): NumberRange => {
    const {
      gridConfig: {
        x: { withPaddings },
      },
    } = props
    const { left, right } = domainPaddings

    return _.flow(
      () => d3.extent(items, v => v.x) as NumberRange,
      domain =>
        padDomain({
          domain,
          paddingStart: withPaddings ? left : 0,
          paddingEnd: withPaddings ? right : 0,
          zoomScale: 1,
        })
    )()
  }

  const getYDomain = (items: readonly Item[]): NumberRange => {
    const {
      gridConfig: {
        y: { withPaddings },
      },
    } = props
    const { top, bottom } = domainPaddings

    return _.flow(
      () => d3.extent(items, v => v.y) as NumberRange,
      domain =>
        padDomain({
          domain,
          paddingStart: withPaddings ? bottom : 0,
          paddingEnd: withPaddings ? top : 0,
          zoomScale: 1,
        })
    )()
  }

  const onFrameSizeChange = ({
    xAxisHeight,
    yAxisWidth,
  }: {
    xAxisHeight: number
    yAxisWidth: number
  }) => {
    const newPaddings = {
      paddingX: yAxisWidth,
      paddingY: xAxisHeight,
    }
    const { paddingX, paddingY } = state
    const targetPaddings = { paddingX, paddingY }

    if (!_.isEqual(newPaddings, targetPaddings)) {
      const currentPaddings = _.pick(state, ['paddingX', 'paddingY'])

      if (!currentPaddings.paddingX || !currentPaddings.paddingY) {
        setState(prevState => ({
          ...prevState,
          ...newPaddings,
        }))
      } else {
        d3.select(paddingTransitionEl)
          .interrupt()
          .transition()
          .duration(TRANSITION_SIZE)
          .tween('paddings', () => {
            const i = d3.interpolateObject(currentPaddings, newPaddings)

            return (t: number) => {
              setState(prevState => ({
                ...prevState,
                ...i(t),
              }))
            }
          })
      }
    }
  }

  const getSvgSize = () => {
    const { width, height, paddingX, paddingY } = state

    return {
      svgWidth: Math.round(width - paddingX),
      svgHeight: Math.round(height - paddingY),
    }
  }

  const getTicks = () => {
    const { xDomain, yDomain } = state
    const { svgWidth, svgHeight } = getSvgSize()

    const xGridTicks = gridConfig.x.gridTicks
    const yGridTicks = gridConfig.y.gridTicks

    const xGridTickValues = getMainTickValues({
      items: getAllValues(),
      domain: xDomain,
      ticksCount: xGridTicks ?? Math.round(svgWidth / 50),
    })

    const yGridTickValues = getSecondaryTickValues({
      items: getAllValues(),
      domain: yDomain,
      ticksCount: yGridTicks ?? Math.round(svgHeight / 50),
    })

    return {
      xGridTickValues,
      xLabelTickValues: xGridTickValues,
      yGridTickValues,
      yLabelTickValues: yGridTickValues,
    }
  }

  const getThreshold = (): Threshold | undefined => {
    const { threshold } = props

    if (!threshold) {
      return undefined
    }

    return {
      max: {
        ...threshold.max,
        values: flipPointsOnAxes(threshold.max.values, true),
      },
      min: threshold.min && {
        ...threshold.min,
        values: flipPointsOnAxes(threshold.min.values, true),
      },
    }
  }

  const getThresholdLines = () => {
    const { threshold } = props

    if (!threshold) {
      return []
    }

    const { max, min = { values: [] } } = threshold

    return [flipPointsOnAxes(max.values, true), flipPointsOnAxes(min.values, true)]
  }

  const getAllThresholdValues = (): readonly Item[] => _.flatten(getThresholdLines())

  React.useEffect(() => {
    const refObj = ref.current!
    const updateSize = () => {
      const { width, height } = refObj.getBoundingClientRect()
      const newSize = { width, height }

      if (!_.isEqual(_.pick(state, ['width', 'height']), newSize)) {
        setState(prevState => ({
          ...prevState,
          ...newSize,
        }))
      }
    }

    const updateDomains = () => {
      const linesValues = getAllValues()
      const thresholdValues = getAllThresholdValues()
      const values: readonly Item[] = [...linesValues, ...thresholdValues]

      const xDomain = getDomainWithLimits(getXDomain(values), gridConfig.x.min, gridConfig.x.max)
      const yDomain = getDomainWithLimits(getYDomain(values), gridConfig.y.min, gridConfig.y.max)

      const [xGuideValue] = d3.extent(values, v => v.x) as NumberRange
      const [yGuideValue] = d3.extent(values, v => v.y) as NumberRange

      setState(prevState => ({
        ...prevState,
        xDomain,
        yDomain,
        xGuideValue,
        yGuideValue,
      }))
    }

    const resizeObserver = new ResizeObserver(() => updateSize())

    resizeObserver.observe(refObj)

    updateSize()
    updateDomains()

    return () => resizeObserver.unobserve(refObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { xDomain, yDomain } = state
  const { svgWidth, svgHeight } = getSvgSize()
  const { xGridTickValues, yGridTickValues } = getTicks()
  const widthWithLimitedStep = svgWidth + xGridTickValues.length * MIN_STEP_SIZE
  const scaleX = getXScale(xDomain, limitMinimumStepSize ? widthWithLimitedStep : svgWidth)
  const scaleY = getYScale(yDomain, svgHeight)
  const lineClipPath = `url(#${lineClipId})`
  const dotsClipPath = `url(#${dotsClipId})`
  const threshold = getThreshold()
  const legendPosition = legend?.position || 'top'
  const legendAlign = legend?.align || 'center'
  const legendProps = {
    direction: 'row' as LegendDirection,
    type: 'dot' as LegendType,
    size: 's' as LegendSize,
    labelPosition: 'left' as LegendLabelPosition,
  }

  return (
    <div className={cnLinearChart()}>
      <LineTooltip
        lines={lines}
        scaleX={scaleX}
        scaleY={scaleY}
        hoveredMainValue={hoveredMainValue}
        hoveredDotValue={hoveredDotValue}
        anchorEl={svgWrapperRef.current}
        threshold={threshold}
        formatValueForLabel={formatValueForLabel}
        formatValueForTooltip={formatValueForTooltip}
        formatValueForTooltipTitle={formatValueForTooltipTitle}
      />
      {legend && (
        <div className={cnLinearChart('Legend', { legendPosition, legendAlign })}>
          <Legend items={legend.items} {...legendProps} />
        </div>
      )}
      <div ref={ref} className={cnLinearChart('Graph')}>
        {limitMinimumStepSize && (
          <svg
            className={cnLinearChart('Svg')}
            width={svgWidth}
            height={svgHeight}
            style={{ top: UNIT_Y_MARGIN }}
          >
            <Frame
              width={widthWithLimitedStep}
              height={svgHeight}
              gridConfig={gridConfig}
              scales={{
                x: scaleX,
                y: scaleY,
              }}
              xGridTickValues={xGridTickValues}
              yGridTickValues={yGridTickValues}
              yDimensionUnit={yDimensionUnit}
              yLabelsShowInPercent={yLabelsShowInPercent}
              xLabelsShowVertical={xLabelsShowVertical}
              xHideFirstLabel={xHideFirstLabel}
              formatValueForLabel={formatValueForLabel}
              onFrameSizeChange={onFrameSizeChange}
              showOnlyY={true}
            />
          </svg>
        )}
        <div
          style={{
            width: svgWidth,
            height: svgHeight + UNIT_Y_MARGIN + SCROLL_OFFSET,
            paddingTop: UNIT_Y_MARGIN,
          }}
          className={cnLinearChart('Wrapper', { isVisible: !limitMinimumStepSize }, ['Svg'])}
        >
          <svg
            ref={svgWrapperRef}
            className={cnLinearChart('Svg')}
            width={limitMinimumStepSize ? widthWithLimitedStep : svgWidth}
            height={svgHeight}
            style={limitMinimumStepSize ? { left: 0 } : { top: UNIT_Y_MARGIN }}
          >
            <Frame
              width={limitMinimumStepSize ? widthWithLimitedStep : svgWidth}
              height={svgHeight}
              gridConfig={gridConfig}
              scales={{
                x: scaleX,
                y: scaleY,
              }}
              xGridTickValues={xGridTickValues}
              yGridTickValues={yGridTickValues}
              yDimensionUnit={yDimensionUnit}
              yLabelsShowInPercent={yLabelsShowInPercent}
              xLabelsShowVertical={xLabelsShowVertical}
              xHideFirstLabel={xHideFirstLabel}
              formatValueForLabel={formatValueForLabel}
              onFrameSizeChange={onFrameSizeChange}
              hideYLabels={limitMinimumStepSize}
            />

            {tooltipVariant === tooltipVariants[0] ? (
              <HoverLines
                lines={lines}
                scaleX={scaleX}
                height={svgHeight}
                hoveredMainValue={hoveredMainValue}
                onChangeHoveredMainValue={setHoveredMainValue}
                onClickLine={onClickHoverLine}
              />
            ) : (
              <HoverDots
                lines={lines}
                scaleX={scaleX}
                scaleY={scaleY}
                dotsClipPath={dotsClipPath}
                defaultDotRadius={dotRadius}
                onChangeHoveredDotValue={setHoveredDotValue}
                onClickDot={onClickHoverDot}
              />
            )}

            {threshold && (
              <Threshold
                scaleX={scaleX}
                scaleY={scaleY}
                maxPoints={threshold.max.values}
                minPoints={threshold.min?.values}
                maxLabel={threshold.max.label}
                minLabel={threshold.min?.label}
                lineClipPath={lineClipPath}
              />
            )}

            {lines.map(line => {
              const gradientProps = line.withGradient
                ? ({
                    withGradient: true,
                    areaBottom: Math.max(
                      Math.min(..._.flatten(line.values.map(v => v.y).filter(isNotNil))),
                      0
                    ),
                    gradientDirectionY: 'toTop',
                  } as const)
                : ({
                    withGradient: false,
                  } as const)

              return (
                <LineWithDots
                  key={line.lineName}
                  values={[...line.values]}
                  color={line.color}
                  hasDotRadius={line.dots}
                  showValues={line.showValues}
                  formatValueForDot={line.showValues ? line.formatValueForDot : undefined}
                  dashed={line.dashed}
                  defaultDotRadius={dotRadius}
                  scaleX={scaleX}
                  scaleY={scaleY}
                  lineClipPath={lineClipPath}
                  dotsClipPath={dotsClipPath}
                  hoveredMainValue={hoveredMainValue}
                  hoveredDotValue={hoveredDotValue}
                  {...gradientProps}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}
