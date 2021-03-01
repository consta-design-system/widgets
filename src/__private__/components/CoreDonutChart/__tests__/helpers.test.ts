import { times } from 'lodash'

import {
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  getChartSize,
  getDonutMaxMinSizeRect,
  getDonutRadius,
  getPadding,
  getSizeDonut,
  MAX_CIRCLES_TO_RENDER,
  minChartSize,
} from '../helpers'

const LINES = [1, 2, 3] as const

describe('getChartSize', () => {
  it('получение размера графика', () => {
    expect(getChartSize({ width: 400, height: 200 })).toEqual(200)
  })

  it('получение размера графика обрезанного по вертикали', () => {
    expect(getChartSize({ width: 100, height: 200, halfDonut: 'right' })).toEqual(200)
    expect(getChartSize({ width: 100, height: 200, halfDonut: 'left' })).toEqual(200)
  })

  it('получение размера графика обрезанного по горизонтали', () => {
    expect(getChartSize({ width: 200, height: 100, halfDonut: 'top' })).toEqual(200)
    expect(getChartSize({ width: 200, height: 100, halfDonut: 'bottom' })).toEqual(200)
  })
})

describe('getPadding', () => {
  it('получение размера отступа между линиями графика', () => {
    expect(getPadding(1, 100)).toEqual(0)
    expect(getPadding(2, 100)).toEqual(8)
    expect(getPadding(3, 100)).toEqual(6)
  })
})

describe('getSizeDonut', () => {
  it('получение размера толщины линии графика', () => {
    expect(getSizeDonut(1, 100)).toEqual(12)
    expect(getSizeDonut(2, 100)).toEqual(10)
    expect(getSizeDonut(3, 100)).toEqual(8)
  })
})

describe('getDonutRadius', () => {
  const MAIN_RADIUS = 50
  const COUNT_LINES = LINES.length
  const SIZE = 100

  it('получение размера радиуса первой линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 0,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    })

    expect(received).toEqual(50)
  })

  it('получение размера радиуса второй линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 1,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    })

    expect(received).toEqual(36)
  })

  it('получение размера радиуса третьей линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 2,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    })

    expect(received).toEqual(22)
  })
})

describe('defaultGetCirclesCount', () => {
  it('возвращает количество линий', () => {
    expect(defaultGetCirclesCount([{ name: '', color: '', values: [0, 0] }])).toBe(2)
  })

  it('возвращает количество линий, если данные пустые', () => {
    expect(defaultGetCirclesCount([])).toEqual(0)
  })

  it('возвращает количество линий не больше максимального', () => {
    expect(defaultGetCirclesCount([{ name: '', color: '', values: times(10, () => 0) }])).toBe(
      MAX_CIRCLES_TO_RENDER
    )
  })
})

describe('defaultGetMinChartSize', () => {
  it('получение минимального размера необрезанного графика без текста', () => {
    LINES.map(l => {
      expect(defaultGetMinChartSize(l)).toEqual(minChartSize[l])
    })
  })

  it('получение минимального размера необрезанного графика с 1 линией и текстом', () => {
    expect(defaultGetMinChartSize(1, true)).toEqual(96)
  })

  it('получение минимального размера необрезанного графика с 2 линиями и текстом', () => {
    expect(defaultGetMinChartSize(2, true)).toEqual(minChartSize[2])
  })

  it('получение минимального размера необрезанного графика с 3 линиями и текстом', () => {
    expect(defaultGetMinChartSize(3, true)).toEqual(minChartSize[3])
  })

  it('получение минимального размера обрезанного графика с 1 линией и текстом', () => {
    expect(defaultGetMinChartSize(1, true, 'top')).toEqual(170)
    expect(defaultGetMinChartSize(1, true, 'right')).toEqual(170)
    expect(defaultGetMinChartSize(1, true, 'bottom')).toEqual(170)
    expect(defaultGetMinChartSize(1, true, 'right')).toEqual(170)
  })

  it('получение минимального размера обрезанного графика с 2 линиями и текстом', () => {
    expect(defaultGetMinChartSize(2, true, 'top')).toEqual(minChartSize[2])
    expect(defaultGetMinChartSize(2, true, 'right')).toEqual(minChartSize[2])
    expect(defaultGetMinChartSize(2, true, 'bottom')).toEqual(minChartSize[2])
    expect(defaultGetMinChartSize(2, true, 'left')).toEqual(minChartSize[2])
  })

  it('получение минимального размера обрезанного графика с 3 линиями и текстом', () => {
    expect(defaultGetMinChartSize(3, true, 'top')).toEqual(minChartSize[3])
    expect(defaultGetMinChartSize(3, true, 'right')).toEqual(minChartSize[3])
    expect(defaultGetMinChartSize(3, true, 'bottom')).toEqual(minChartSize[3])
    expect(defaultGetMinChartSize(3, true, 'left')).toEqual(minChartSize[3])
  })
})

describe('getDonutMaxMinSizeRect', () => {
  it('получение стилей для минимального и максимального размера графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      isHalfHorizontal: false,
      isHalfVertical: false,
      minSize: 50,
    })

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: undefined,
    })
  })

  it('получение стилей для минимального и максимального размера обрезанного по горизонтали графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      isHalfHorizontal: true,
      isHalfVertical: false,
      minSize: 50,
    })

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: 50,
    })
  })

  it('получение стилей для минимального и максимального размера обрезанного по вертикале графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      isHalfHorizontal: false,
      isHalfVertical: true,
      minSize: 50,
    })

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: 50,
      minHeight: 50,
      maxHeight: undefined,
    })
  })

  it('получение стилей для минимального и максимального размера полного графика с ограничение максимального размера по высоте', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      isHalfHorizontal: false,
      isHalfVertical: false,
      minSize: 50,
      limitSizeSide: 'height',
    })

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: 100,
    })
  })

  it('получение стилей для минимального и максимального размера полного графика с ограничение максимального размера по ширине', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      isHalfHorizontal: false,
      isHalfVertical: false,
      minSize: 50,
      limitSizeSide: 'width',
    })

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: 100,
      minHeight: 50,
      maxHeight: undefined,
    })
  })
})
