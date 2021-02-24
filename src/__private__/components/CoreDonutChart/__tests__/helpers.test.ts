import { times } from 'lodash'

import {
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  donutSize,
  getChartSize,
  getDonutRadius,
  getPadding,
  getSizeDonut,
  MAX_CIRCLES_TO_RENDER,
  minChartSize,
  paddingBetweenDonuts,
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
    LINES.map(l => {
      expect(getPadding(l)).toEqual(paddingBetweenDonuts[l])
    })
  })
})

describe('getSizeDonut', () => {
  it('получение размера толщины линии графика', () => {
    LINES.map(l => {
      expect(getSizeDonut(l)).toEqual(donutSize[l])
    })
  })

  it('получение размера толщины линии графика с текстом', () => {
    expect(getSizeDonut(1, true)).toEqual(16)
  })

  it('получение размера толщины линии обрезанного графика без текста', () => {
    LINES.map(l => {
      expect(getSizeDonut(l, false, 'top')).toEqual(16)
      expect(getSizeDonut(l, false, 'right')).toEqual(16)
      expect(getSizeDonut(l, false, 'bottom')).toEqual(16)
      expect(getSizeDonut(l, false, 'left')).toEqual(16)
    })
  })

  it('получение размера толщины линии обрезанного графика с текстом', () => {
    LINES.map(l => {
      expect(getSizeDonut(l, true, 'top')).toEqual(16)
      expect(getSizeDonut(l, true, 'right')).toEqual(16)
      expect(getSizeDonut(l, true, 'bottom')).toEqual(16)
      expect(getSizeDonut(l, true, 'left')).toEqual(16)
    })
  })
})

describe('getDonutRadius', () => {
  const MAIN_RADIUS = 500
  const COUNT_LINES = LINES.length

  it('получение размера радиуса первой линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 0, COUNT_LINES)).toEqual(500)
  })

  it('получение размера радиуса второй линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 1, COUNT_LINES)).toEqual(474)
  })

  it('получение размера радиуса третьей линии', () => {
    expect(getDonutRadius(MAIN_RADIUS, 2, COUNT_LINES)).toEqual(448)
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
