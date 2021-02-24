import { deg2rad } from '@/__private__/utils/math'

import { HalfDonut } from '../CoreDonutChartPie/CoreDonutChartPie'

const TEXT_CHORD_ANGLE_IN_RADIANS = deg2rad(35)
export const MIN_FONT_SIZE = 20
export const VALUE_MAX_FONT_SIZE = 96
export const TITLE_FONT_SIZE_RATIO = 0.4
export const TITLE_MIN_FONT_SIZE = 10
export const SUBVALUE_FONT_SIZE_RATIO = 0.5
export const MARGIN_FROM_LINE = 2

export const getContentBorderRadius = (radius: number, halfDonut?: HalfDonut) => {
  if (!halfDonut) {
    return `${radius}px`
  }

  const topLeft = ['bottom', 'right'].includes(halfDonut) ? radius : 0
  const topRight = ['bottom', 'left'].includes(halfDonut) ? radius : 0
  const bottomRight = ['top', 'left'].includes(halfDonut) ? radius : 0
  const bottomLeft = ['top', 'right'].includes(halfDonut) ? radius : 0

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
}

export const getContentHeight = ({
  diameter,
  radius,
  isHalfDonutHorizontal,
  isHalfDonutVertical,
  paddingFromBorder,
  paddingFromLine,
}: {
  diameter: number
  radius: number
  isHalfDonutHorizontal: boolean
  isHalfDonutVertical: boolean
  paddingFromBorder: number
  paddingFromLine: number
}) => {
  const isHalfDonut = isHalfDonutHorizontal || isHalfDonutVertical
  const countLines = isHalfDonut ? 1 : 2
  const offset = paddingFromBorder + paddingFromLine * countLines
  const height = isHalfDonutHorizontal ? radius : diameter

  return height - offset
}

export const getValueHeightRatio = ({
  isHalfDonutHorizontal,
  isHalfDonutVertical,
  titleIsExist,
}: {
  isHalfDonutHorizontal: boolean
  isHalfDonutVertical: boolean
  titleIsExist: boolean
}) => {
  if (isHalfDonutHorizontal && !titleIsExist) {
    return 1
  }

  if (isHalfDonutVertical) {
    return 0.25
  }

  return 0.5
}

export const getValueMaxFontSize = ({ height, ratio }: { height: number; ratio: number }) => {
  /**
   * В случае, если максимальный размер окажется меньше минимально допустимого, возвращаем минимальный,
   * т.к. <TextFit /> отдает предпочтение указанному максимальному размеру,
   * без данного ограничения шрифт может оказаться меньше минимального
   */
  return Math.max(Math.min(Math.round(height * ratio), VALUE_MAX_FONT_SIZE), MIN_FONT_SIZE)
}

/**
 * Расчитываем максимальную ширину текста по хорде окружности.
 */
export const getValueMaxWidth = (diameter: number) => {
  return Math.round(diameter * Math.sin(TEXT_CHORD_ANGLE_IN_RADIANS))
}
