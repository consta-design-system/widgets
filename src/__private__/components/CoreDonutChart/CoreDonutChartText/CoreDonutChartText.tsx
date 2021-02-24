import React from 'react'

import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'
import { Textfit } from '@evless/react-textfit'

import { cn } from '@/__private__/utils/bem'

import {
  isHalfDonutHorizontal as getIsHalfDonutHorizontal,
  isHalfDonutVertical as getIsHalfDonutVertical,
} from '../helpers'
import { HalfDonut } from '../CoreDonutChartPie/CoreDonutChartPie'

import {
  getContentBorderRadius,
  getContentHeight,
  getValueHeightRatio,
  getValueMaxFontSize,
  getValueMaxWidth,
  MARGIN_FROM_LINE,
  MIN_FONT_SIZE,
  SUBVALUE_FONT_SIZE_RATIO,
  TITLE_FONT_SIZE_RATIO,
  TITLE_MIN_FONT_SIZE,
} from './helpers'
import './CoreDonutChartText.css'

const cnCoreDonutChartText = cn('CoreDonutChartText')

export type Data = {
  value: string
  title?: string
  subTitle?: string
  subValue?: string
}

type Props = {
  data: Data
  radius: number
  lineWidth: number
  titlePosition: 'top' | 'bottom'
  paddingFromBorder: number
  showTitle: boolean
  showSubBlock: boolean
  halfDonut?: HalfDonut
  valueSize?: number
}

export const DonutText: React.FC<Props> = ({
  data,
  radius,
  lineWidth,
  titlePosition,
  paddingFromBorder,
  showTitle,
  showSubBlock,
  halfDonut,
  valueSize,
}) => {
  const [baseFontSize, setBaseFontSize] = React.useState(0)

  const isHalfDonutHorizontal = getIsHalfDonutHorizontal(halfDonut)
  const isHalfDonutVertical = getIsHalfDonutVertical(halfDonut)
  const diameter = radius * 2
  const paddingFromLine = halfDonut ? lineWidth : 7
  const titleFontSize = Math.max(
    Math.round(baseFontSize * TITLE_FONT_SIZE_RATIO),
    TITLE_MIN_FONT_SIZE
  )
  const subValueFontSize = Math.round(baseFontSize * SUBVALUE_FONT_SIZE_RATIO)
  const contentHeight = getContentHeight({
    diameter,
    radius,
    isHalfDonutHorizontal,
    isHalfDonutVertical,
    paddingFromBorder,
    paddingFromLine,
  })
  const contentHeightValueRatio = getValueHeightRatio({
    isHalfDonutHorizontal,
    isHalfDonutVertical,
    titleIsExist: isDefined(data.title),
  })
  const valueMaxSize = isNotNil(valueSize)
    ? valueSize
    : getValueMaxFontSize({
        height: contentHeight,
        ratio: contentHeightValueRatio,
      })
  const valueMinSize = isNotNil(valueSize) ? valueSize : MIN_FONT_SIZE
  const valueMaxWidth = `${getValueMaxWidth(diameter)}px`

  const contentStyle: React.CSSProperties = {
    maxWidth: (isHalfDonutVertical ? radius : diameter) - MARGIN_FROM_LINE,
    maxHeight: (isHalfDonutHorizontal ? radius : diameter) - MARGIN_FROM_LINE,
    borderRadius: getContentBorderRadius(radius, halfDonut),
  }

  const elements = [
    showTitle && data.title ? (
      <div
        key="title"
        className={cnCoreDonutChartText('Title')}
        style={{ fontSize: `${titleFontSize}px` }}
      >
        {data.title}
      </div>
    ) : null,
    valueMaxSize > 0 ? (
      <Textfit
        key="value"
        className={cnCoreDonutChartText('Value', { half: halfDonut })}
        mode="single"
        min={valueMinSize}
        max={valueMaxSize}
        style={{ maxWidth: valueMaxWidth }}
        onReady={setBaseFontSize}
      >
        {data.value}
      </Textfit>
    ) : null,
  ] as const

  return (
    <div
      className={cnCoreDonutChartText({ half: halfDonut })}
      style={{
        ['--padding-from-line' as string]: `${paddingFromLine}px`,
        ['--padding-from-border' as string]: `${paddingFromBorder}px`,
      }}
    >
      <div
        className={cnCoreDonutChartText('Content', { half: halfDonut ?? 'none' })}
        style={contentStyle}
      >
        {titlePosition === 'bottom' ? [...elements].reverse() : elements}
        {showSubBlock && (
          <>
            {data.subTitle && (
              <div
                className={cnCoreDonutChartText('Title')}
                style={{ fontSize: `${titleFontSize}px` }}
              >
                {data.subTitle}
              </div>
            )}
            {data.subValue && (
              <div
                className={cnCoreDonutChartText('SubValue')}
                style={{ fontSize: `${subValueFontSize}px` }}
              >
                {data.subValue}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
