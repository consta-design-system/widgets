import {
  flipPointsOnAxes,
  getIndexWithFallbackToDefault,
  getMainTickValues,
  getSecondaryTickValues,
  getUniqValues,
  getXRange,
  getXScale,
  getYRange,
  getYScale,
  INITIAL_DOMAIN,
  padDomain,
} from '../helpers'

describe('getMainTickValues', () => {
  const values = [
    { x: 0, y: 9 },
    { x: 1, y: 6 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
  ] as const

  describe('горизонтальный график', () => {
    const commonParams = {
      items: flipPointsOnAxes(values),
      domain: [0, 3],
    } as const

    it('вернёт пустой массив', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 0,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с нужным количеством засечек', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('вернёт засечки только в пределах указанного домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 4,
        domain: [0, 2],
      })

      expect(result).toEqual([0, 0.5, 1, 1.5, 2])
    })

    it('вернёт засечки для пропусков', () => {
      const result = getMainTickValues({
        ...commonParams,
        items: flipPointsOnAxes([
          { x: 0, y: null },
          { x: 1, y: null },
          { x: 2, y: null },
          { x: 3, y: 0 },
        ]),
        ticksCount: 4,
      })

      expect(result).toEqual([0, 1, 2, 3])
    })

    it('возвращает 1 засечку', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 1,
      })

      expect(result).toEqual([0])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getMainTickValues({
        ...commonParams,
        ticksCount: 2,
      })

      expect(result).toEqual([0, 3])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getMainTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        ticksCount: 4,
      })

      expect(result).toEqual([])
    })

    it('вернёт значения с шагом больше единицы', () => {
      const result = getMainTickValues({
        domain: [0, 400],
        items: flipPointsOnAxes([
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 200, y: 0 },
          { x: 300, y: 0 },
          { x: 400, y: 0 },
        ]),
        ticksCount: 5,
      })

      expect(result).toEqual([0, 100, 200, 300, 400])
    })

    it('вернёт значения с дробным шагом', () => {
      const result = getMainTickValues({
        domain: [0, 1],
        items: flipPointsOnAxes([
          { x: 0, y: 0 },
          { x: 0.2, y: 0 },
          { x: 0.4, y: 0 },
          { x: 0.6, y: 0 },
          { x: 0.8, y: 0 },
          { x: 1, y: 0 },
        ]),
        ticksCount: 6,
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })
  })
})

describe('getSecondaryTickValues', () => {
  const values = [
    { x: 0, y: 9 },
    { x: 1, y: 6 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
  ] as const

  describe('горизонтальный график', () => {
    const commonParams = {
      items: flipPointsOnAxes(values),
      domain: [0, 10],
    } as const

    it('вернёт пустой массив', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: 0,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с засечками', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: 4,
      })

      expect(result).toEqual([0, 2, 4, 6, 8, 10])
    })

    it('возвращает 2 засечки: минимальную и максимальную', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        ticksCount: 2,
      })

      expect(result).toEqual([0, 3])
    })

    it('вернёт пустой массив для начального домена', () => {
      const result = getSecondaryTickValues({
        ...commonParams,
        domain: INITIAL_DOMAIN,
        ticksCount: 4,
      })

      expect(result).toEqual([])
    })

    it('вернёт массив с заполненными пропусками', () => {
      const result = getSecondaryTickValues({
        items: flipPointsOnAxes([
          { x: 0, y: 0 },
          { x: 0, y: 0.4 },
          { x: 0, y: 0.8 },
          { x: 0, y: 1 },
        ]),
        domain: [0, 1],
        ticksCount: 6,
      })

      expect(result).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
    })
  })
})

describe('padDomain', () => {
  const padding = 0.1

  it('вернёт домен с отступами когда зум = 1', () => {
    const paddedDomain = padDomain({
      domain: [0, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 1,
    })
    expect(paddedDomain).toEqual([-1, 11])
  })

  it('вернёт домен с отступами когда зум = 2', () => {
    const paddedDomain = padDomain({
      domain: [-10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 2,
    })
    expect(paddedDomain).toEqual([-11, 11])
  })

  it('вернёт домен с отступами когда зум = 4', () => {
    const paddedDomain = padDomain({
      domain: [40, 100],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 4,
    })
    expect(paddedDomain).toEqual([38.5, 101.5])
  })

  it('вернёт домен с отступами когда зум = 8', () => {
    const paddedDomain = padDomain({
      domain: [-50, 50],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 8,
    })
    expect(paddedDomain).toEqual([-51.25, 51.25])
  })

  it('вернёт домен с отступами когда значения начала и конца одинаковые', () => {
    const paddedDomain = padDomain({
      domain: [10, 10],
      paddingStart: padding,
      paddingEnd: padding,
      zoomScale: 1,
    })
    expect(paddedDomain).toEqual([9, 11])
  })
})

describe('getIndexWithFallbackToDefault', () => {
  it('получаем индекс элемента если он не входит в отрицательный диапазон', () => {
    expect(getIndexWithFallbackToDefault(1, 1)).toEqual(1)
  })

  it('получаем индекс элемента если он входит в отрицательный диапазон', () => {
    expect(getIndexWithFallbackToDefault(-1, 1)).toEqual(1)
  })
})

describe('getXRange', () => {
  it('получение диапазона для оси X', () => {
    expect(getXRange(100)).toEqual([0, 100])
  })
})

describe('getYRange', () => {
  it('получение диапазона для оси Y', () => {
    expect(getYRange(100)).toEqual([99, 0])
  })
})

describe('getXScale', () => {
  const DOMAIN = [1, 2] as const
  const WIDTH = 100

  it('получение значение позиции точки на оси X в пикселях', () => {
    const scaler = getXScale(DOMAIN, WIDTH)

    expect(scaler(1)).toEqual(0)
    expect(scaler(2)).toEqual(100)
  })
})

describe('getYScale', () => {
  const DOMAIN = [1, 2] as const
  const HEIGHT = 100

  it('получение значение позиции точки на оси Y в пикселях', () => {
    const scaler = getYScale(DOMAIN, HEIGHT)

    expect(scaler(1)).toEqual(99)
    expect(scaler(2)).toEqual(0)
  })
})

describe('flipPointsOnAxes', () => {
  const ITEMS = [
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: null },
  ] as const

  it('не переворачивает значения на осях для горизонтального графика', () => {
    expect(flipPointsOnAxes(ITEMS, true)).toEqual(ITEMS)
  })
})

describe('getUniqValues', () => {
  const ITEMS = [
    { x: 0, y: 0 },
    { x: 0, y: 4 },
    { x: 1, y: 2 },
    { x: 1, y: 4 },
    { x: 2, y: null },
    { x: 3, y: 2 },
  ] as const

  it('возвращает пустой массив если значения находятся за пределом домена', () => {
    expect(getUniqValues(ITEMS, [-100, -100], 'x')).toEqual([])
    expect(getUniqValues(ITEMS, [-100, -100], 'y')).toEqual([])
  })

  describe('горизонтальный график', () => {
    it('возвращает уникальные элементы для всего домена по X', () => {
      expect(getUniqValues(ITEMS, [0, 3], 'x')).toEqual([0, 1, 2, 3])
    })

    it('возвращает уникальные элементы по выборке из домена для X', () => {
      expect(getUniqValues(ITEMS, [0, 1], 'x')).toEqual([0, 1])
    })

    it('возвращает уникальные элементы для всего домена по Y', () => {
      expect(getUniqValues(ITEMS, [0, 4], 'y')).toEqual([0, 2, 4])
    })

    it('возвращает уникальные элементы по выборке из домена для Y', () => {
      expect(getUniqValues(ITEMS, [0, 2], 'y')).toEqual([0, 2])
    })
  })
})
