import { scaleLinear as d3ScaleLinear } from 'd3-scale'

export type Scaler<T> = {
  scale: (value: T) => number
  bandwidth?: (value?: T) => number
}

export type NumberRange = readonly [number, number]

type ScaleBandParams = {
  domain: readonly string[]
  range: NumberRange
  paddingInner?: number
  paddingOuter?: number
  align?: number
}

export const scaleBand = ({
  domain,
  range,
  paddingInner = 0,
  paddingOuter = 0,
  align = 0.5,
}: ScaleBandParams): Scaler<string> => {
  const n = domain.length
  const [start, end] = range
  const fullPaddingOuter = paddingOuter * 2

  const step = (end - start - fullPaddingOuter - paddingInner * (n - 1)) / n
  const startWithOffset = start + fullPaddingOuter * align

  const values = domain.reduce<Record<string, number>>((acc, key, i) => {
    acc[key] = Math.round(startWithOffset + (step + paddingInner) * i)
    return acc
  }, {})

  return {
    scale: (key: string) => values[key],
    bandwidth: () => step,
  }
}

type ScaleLinearParams = {
  domain: readonly number[]
  range: NumberRange
}

export const scaleLinear = ({ domain, range }: ScaleLinearParams): Scaler<number> => {
  const scale = d3ScaleLinear()
    .domain([...domain])
    .range([...range])

  return {
    scale: (value: number) => scale(value),
  }
}
