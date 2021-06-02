import React, { forwardRef, SVGAttributes, useLayoutEffect, useRef, useState } from 'react'

import { useForkRef } from '@consta/uikit/useForkRef'
import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import { PieArcDatum } from 'd3-shape'

import { cn } from '@/__private__/utils/bem'
import { useComponentSize } from '@/__private__/utils/useComponentSize'

import {
  ArcDataItem,
  ArcLabelSize,
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

type Rect = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>

type Item = ArcDataItem & {
  rect: DOMRect | undefined
}

type MainElementProps = SVGAttributes<SVGGElement>

type Props = MainElementProps & {
  data: ReadonlyArray<PieArcDatum<ArcDataItem>>
  radius: number
  size: ArcLabelSize
  halfDonut?: HalfDonut
  formatArcLabel: FormatArcLabel
}

const getRectWithPadding = (rect: Rect, padding: number) => {
  return {
    x: rect.x - padding,
    y: rect.y - padding,
    width: rect.width + padding,
    height: rect.height + padding,
  }
}

const isIntersec = (prev: Rect, next: Rect) => {
  const computedPrev = getRectWithPadding(prev, 4)
  const computedNext = getRectWithPadding(next, 4)

  if (
    (computedNext.y >= computedPrev.y &&
      computedNext.y <= computedPrev.y + computedPrev.height &&
      computedNext.x <= computedPrev.x &&
      computedNext.x + computedNext.width >= computedPrev.x) ||
    (computedNext.y + computedNext.height >= computedPrev.y &&
      computedNext.y + computedNext.height <= computedPrev.y + computedPrev.height &&
      computedNext.x <= computedPrev.x &&
      computedNext.x + computedNext.width >= computedPrev.x) ||
    (computedNext.y >= computedPrev.y &&
      computedNext.y <= computedPrev.y + computedPrev.height &&
      computedNext.x <= computedPrev.x + computedPrev.width &&
      computedNext.x + computedNext.width >= computedPrev.x + computedPrev.width) ||
    (computedNext.y + computedNext.height >= computedPrev.y &&
      computedNext.y + computedNext.height <= computedPrev.y + computedPrev.height &&
      computedNext.x <= computedPrev.x + computedPrev.width &&
      computedNext.x + computedNext.width >= computedPrev.x + computedPrev.width)
  ) {
    return true
  }

  return false
}

const getIndexsForHiddenLabels = (items: readonly Item[]) => {
  return items.reduce<number[]>((mutableAcc, current, currentIdx, arr) => {
    if (!current.rect || mutableAcc.includes(currentIdx)) {
      return mutableAcc
    }

    arr.forEach((other, otherIdx) => {
      if (
        !current.rect ||
        !other.rect ||
        currentIdx === otherIdx ||
        mutableAcc.includes(currentIdx) ||
        mutableAcc.includes(otherIdx)
      ) {
        return
      }

      if (!isNotNil(current.value) || !isNotNil(other.value)) {
        return
      }

      if (isIntersec(current.rect, other.rect) && current.value >= other.value) {
        mutableAcc.push(otherIdx)
      }

      if (isIntersec(current.rect, other.rect) && current.value < other.value) {
        mutableAcc.push(currentIdx)
      }
    })

    return mutableAcc
  }, [])
}

export const CoreDonutChartLabels = forwardRef<SVGGElement, Props>((props, ref) => {
  const { data, radius, size, halfDonut, formatArcLabel, ...mainElementProps } = props

  const localRef = useRef<SVGGElement>(null)
  const usedRef = useForkRef([ref, localRef])
  const { width, height } = useComponentSize(localRef)
  const textsRefs = useRef(data.map(() => React.createRef<SVGTextElement>()))
  const [hideIndexs, setHideIndexs] = useState<readonly number[]>([])

  const { startLine, endLine, startLabel } = getRendersLabels({
    radius,
    lineWidth: LABEL_LINE_WIDTH,
    labelOffset: LABEL_LINE_OFFSET,
  })

  useLayoutEffect(() => {
    setHideIndexs([])
  }, [data, width, height])

  useLayoutEffect(() => {
    if (hideIndexs.length > 0) {
      return
    }

    const nextHide = getIndexsForHiddenLabels(
      data.map((item, itemIdx) => {
        const itemElement = textsRefs.current[itemIdx].current

        return {
          ...item.data,
          rect: itemElement ? itemElement.getBBox() : undefined,
        }
      })
    )

    if (nextHide.length === 0) {
      return
    }

    setHideIndexs(nextHide)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideIndexs])

  return (
    <g {...mainElementProps} ref={usedRef}>
      {data.map((item, itemIdx) => {
        const [startX, startY] = startLine(item)
        const [endX, endY] = endLine(item)
        const [textX, textY] = startLabel(item)
        const degrees = radianToDegree(getArcMiddleInRadian(item))

        if (!item.data.value || hideIndexs.includes(itemIdx)) {
          return null
        }

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
              ref={textsRefs.current[itemIdx]}
              key={itemIdx}
              className={cnCoreDonutChartLabels('Label', { size })}
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
