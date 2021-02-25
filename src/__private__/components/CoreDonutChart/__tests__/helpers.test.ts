import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array'

import {
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  getArcRadiuses,
  getChartSize,
  getDonutMaxMinSizeRect,
  getDonutRadius,
  getPadding,
  getPieData,
  getSizeDonut,
  getValues,
  isEmptyPieArcDatum,
  MAX_CIRCLES_TO_RENDER,
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
    expect(
      defaultGetCirclesCount([{ name: '', color: '', values: createArrayOfIndexes(10) }])
    ).toBe(MAX_CIRCLES_TO_RENDER)
  })
})

describe('defaultGetMinChartSize', () => {
  it('получение минимального размера необрезанного графика с 1 линией без текста', () => {
    expect(defaultGetMinChartSize(1, false)).toEqual(0)
  })

  it('получение минимального размера необрезанного графика с 2 линиями без текста', () => {
    expect(defaultGetMinChartSize(2, false)).toEqual(0)
  })

  it('получение минимального размера необрезанного графика с 3 линиями без текста', () => {
    expect(defaultGetMinChartSize(3, false)).toEqual(0)
  })

  it('получение минимального размера необрезанного графика с 1 линией с текстом', () => {
    expect(defaultGetMinChartSize(1, true)).toEqual(100)
  })

  it('получение минимального размера необрезанного графика с 2 линиями с текстом', () => {
    expect(defaultGetMinChartSize(2, true)).toEqual(0)
  })

  it('получение минимального размера необрезанного графика с 3 линиями с текстом', () => {
    expect(defaultGetMinChartSize(3, true)).toEqual(0)
    expect(defaultGetMinChartSize(3, false)).toEqual(0)
  })

  it('получение минимального размера обрезанного графика с 1 линией и текстом', () => {
    expect(defaultGetMinChartSize(1, true, 'top')).toEqual(0)
    expect(defaultGetMinChartSize(1, true, 'right')).toEqual(0)
    expect(defaultGetMinChartSize(1, true, 'bottom')).toEqual(0)
    expect(defaultGetMinChartSize(1, true, 'left')).toEqual(0)
  })
})

describe('getValues', () => {
  it('получает данные для одного кольца', () => {
    const received = getValues(
      [
        {
          color: 'red',
          name: 'Group 1',
          values: [1, 2, 3],
        },
      ],
      1
    )

    expect(received).toEqual([[{ color: 'red', name: 'Group 1', value: 1 }]])
  })

  it('Получает данные для трех колец', () => {
    const received = getValues(
      [
        {
          color: 'red',
          name: 'Group 1',
          values: [1, 2, 3],
        },
      ],
      3
    )

    expect(received).toEqual([
      [{ color: 'red', name: 'Group 1', value: 1 }],
      [{ color: 'red', name: 'Group 1', value: 2 }],
      [{ color: 'red', name: 'Group 1', value: 3 }],
    ])
  })

  it('Получает данные для трех колец, если исходные данные пустые', () => {
    const received = getValues([], 3)

    expect(received).toEqual([[], [], []])
  })
})

describe('getPieData', () => {
  it('получение данных для кольца, если исходные данные пустые', () => {
    const received = getPieData([], null)

    expect(received).toEqual([])
  })

  it('получение данных для кольца', () => {
    const received = getPieData([{ color: 'red', name: 'Group 1', value: null }], null)

    expect(received).toEqual([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ])
  })
})

describe('getArcRadiuses', () => {
  it('получение радиусов для дуг', () => {
    const received = getArcRadiuses({
      mainRadius: 100,
      circlesCount: 3,
      sizeDonut: 5,
      chartSize: 200,
    })

    expect(received).toEqual([
      { inner: 95, outer: 100 },
      { inner: 67, outer: 72 },
      { inner: 39, outer: 44 },
    ])
  })
})

describe('isEmptyPieArcDatum', () => {
  it('возвращает true если передать пустой массив', () => {
    const received = isEmptyPieArcDatum([])

    expect(received).toBeTrue()
  })

  it('возвращает true если передать массив в котором у всех элементов в качестве значения дуги 0', () => {
    const received = isEmptyPieArcDatum([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ])

    expect(received).toBeTrue()
  })

  it('возвращает false если передать массив в котором хотя бы у одной дуги значение не равняется 0', () => {
    const received = isEmptyPieArcDatum([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 1,
      },
      {
        data: { color: 'red', name: 'Group 2', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ])

    expect(received).toBeFalse()
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
