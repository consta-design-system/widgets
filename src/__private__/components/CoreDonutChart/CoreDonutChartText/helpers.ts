import { HalfDonut, isHalfDonutHorizontal, isHalfDonutVertical } from '../helpers'

type HalfDonutDirection = 'horizontal' | 'vertical' | 'none'

export const VALUE_MIN_SIZE = 18
export const LABEL_MIN_SIZE = 12
export const TEXT_MAX_HEIGHT_RATIO = 0.66
export const MAX_HEIGHT_AND_LINE_HEIGHT_DIFF_RATIO = 0.8

export const getContentBorderRadius = (radius: number, half?: HalfDonut) => {
  if (!half) {
    return `${radius}px`
  }

  const topLeft = ['bottom', 'right'].includes(half) ? radius : 0
  const topRight = ['bottom', 'left'].includes(half) ? radius : 0
  const bottomRight = ['top', 'left'].includes(half) ? radius : 0
  const bottomLeft = ['top', 'right'].includes(half) ? radius : 0

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

export const getDonutHalfDirection = (half?: HalfDonut) => {
  if (isHalfDonutHorizontal(half)) {
    return 'horizontal'
  }

  if (isHalfDonutVertical(half)) {
    return 'vertical'
  }

  return 'none'
}

export const getPaddingRatio = (condition: (halfDirection: HalfDonutDirection) => boolean) => (
  halfDirection: HalfDonutDirection
) => {
  if (condition(halfDirection)) {
    return 0.1
  }

  return 0.14
}

export const getHeightPaddingRatio = getPaddingRatio(
  halfDirection => halfDirection === 'horizontal'
)

export const getWidthPaddingRatio = getPaddingRatio(halfDirection => halfDirection === 'vertical')

type GetContainerPaddingParams = {
  widthPadding: number
  heightPadding: number
  half?: HalfDonut
}

export const getContainerPadding = ({
  widthPadding,
  heightPadding,
  half,
}: GetContainerPaddingParams) => {
  if (half === 'top') {
    return `0 ${widthPadding}px ${heightPadding}px`
  }

  if (half === 'right') {
    return `${heightPadding}px 0 ${heightPadding}px ${widthPadding}px`
  }

  if (half === 'bottom') {
    return `${heightPadding}px ${widthPadding}px 0`
  }

  if (half === 'left') {
    return `${heightPadding}px ${widthPadding}px ${heightPadding}px 0`
  }

  return `${heightPadding}px ${widthPadding}px`
}

type GetContentPaddingParams = {
  radius: number
  lineWidth: number
  ratio: number
}

export const getContentPadding = ({ radius, lineWidth, ratio }: GetContentPaddingParams) => {
  return (radius + lineWidth) * 2 * ratio
}

type GetRegularOrDoubleNumberByCondition = {
  value: number
  condition: boolean
}

export const getRegularOrDoubleNumberByCondition = ({
  value,
  condition,
}: GetRegularOrDoubleNumberByCondition) => {
  return condition ? value : value * 2
}

type GetContentWidthOrHeightParams = {
  radius: number
  halfDirection: HalfDonutDirection
}

export const getContentWidth = ({ radius, halfDirection }: GetContentWidthOrHeightParams) => {
  return getRegularOrDoubleNumberByCondition({
    value: radius,
    condition: halfDirection === 'vertical',
  })
}

export const getContentHeight = ({ radius, halfDirection }: GetContentWidthOrHeightParams) => {
  return getRegularOrDoubleNumberByCondition({
    value: radius,
    condition: halfDirection === 'horizontal',
  })
}

type GetTextMaxSizeParams = {
  padding: number
  height: number
  ratio: number
}

export const getTextMaxSize = ({ height, padding, ratio }: GetTextMaxSizeParams) => {
  return Math.round((height - padding) * ratio * MAX_HEIGHT_AND_LINE_HEIGHT_DIFF_RATIO)
}
