import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { Item, NotEmptyItem, NumberRange, TickValues } from './LinearChart'

export const INITIAL_DOMAIN = [Number.MIN_VALUE, Number.MAX_VALUE] as const

export const getIndexWithFallbackToDefault = (index: number, def: number): number =>
  index < 0 ? def : index

export const padDomain = ({
  domain,
  paddingStart,
  paddingEnd,
  zoomScale,
}: {
  domain: NumberRange
  paddingStart: number
  paddingEnd: number
  zoomScale: number
}): NumberRange => {
  const [start, end] = domain
  const diff = domain[1] - domain[0]
  const delta = diff === 0 ? domain[0] : diff

  return [
    start - paddingStart * delta * (1 / zoomScale),
    end + paddingEnd * delta * (1 / zoomScale),
  ]
}

export const invertDomain = ([start, end]: NumberRange): NumberRange => [end, start]

// export const zoomDomain = (domain: NumberRange, zoom: ZoomState): NumberRange => {
//   const [domainStart, domainEnd] = domain
//   const domainDelta = domainEnd - domainStart
//   return [domainStart + domainDelta * zoom[0], domainStart + domainDelta * zoom[1]]
// }

export const getXRange = (width: number) => [0, width] as NumberRange
export const getYRange = (height: number) =>
  [
    // Чтобы нарисовался гридлайн на нижней оси
    height - 1,
    0,
  ] as NumberRange

export const getXScale = (domain: NumberRange, width: number) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(getXRange(width))

export const getYScale = (domain: NumberRange, height: number) =>
  d3
    .scaleLinear()
    .domain([...domain])
    .range(getYRange(height))

export const isInDomain = (value: number, domain: readonly number[]) => {
  const minInDomain = Math.min(...domain)
  const maxInDomain = Math.max(...domain)

  return value >= minInDomain && value <= maxInDomain
}

export const getDomainWithLimits = (
  domain: NumberRange,
  min: number | undefined,
  max: number | undefined
): NumberRange => {
  const [domainStart, domainEnd] = domain
  const minWithLim = isNotNil(min) ? Math.min(domainStart, min) : domainStart
  const maxWithLim = isNotNil(max) ? Math.max(domainEnd, max) : domainEnd

  return [minWithLim, maxWithLim]
}

export const getUniqValues = (
  items: readonly Item[],
  domain: NumberRange,
  type: 'x' | 'y'
): readonly number[] => {
  return _.sortBy(
    _.uniq(items.map(v => v[type]))
      .filter(isNotNil)
      .filter(i => isInDomain(i, domain))
  )
}

export const getMainTickValues = ({
  items,
  domain,
  ticksCount,
}: {
  items: readonly Item[]
  ticksCount: number
  domain: NumberRange
}): TickValues => {
  if (domain === INITIAL_DOMAIN) {
    return []
  }

  const [domainStart, domainEnd] = domain
  let uniqValues = getUniqValues(items, domain, 'x')

  if (uniqValues[0] > domainStart) {
    uniqValues = [domainStart, ...uniqValues]
  }

  if (uniqValues[uniqValues.length - 1] < domainEnd) {
    uniqValues = [...uniqValues, domainEnd]
  }

  if (ticksCount === 2) {
    return _.uniq([uniqValues[0], uniqValues[uniqValues.length - 1]])
  }

  return ticksCount === 0
    ? []
    : _.chunk(
        d3.ticks(uniqValues[0], uniqValues[uniqValues.length - 1], ticksCount),
        Math.ceil(uniqValues.length / ticksCount)
      ).map(arr => arr[0])
}

export const getSecondaryTickValues = ({
  items,
  domain,
  ticksCount,
}: {
  items: readonly Item[]
  domain: NumberRange
  ticksCount: number
}) => {
  if (domain === INITIAL_DOMAIN) {
    return []
  }

  const uniqValues = getUniqValues(items, domain, 'y')

  if (ticksCount === 2) {
    return _.uniq([uniqValues[0], uniqValues[uniqValues.length - 1]])
  }

  return ticksCount === 0 ? [] : d3.ticks(domain[0], domain[1], ticksCount)
}

export function flipPointsOnAxes<T extends Item | NotEmptyItem>(
  items: readonly T[],
  isHorizontal?: boolean
): readonly T[] {
  return isHorizontal
    ? items
    : items.map(
        item =>
          ({
            x: item.y,
            y: item.x,
          } as T)
      )
}
