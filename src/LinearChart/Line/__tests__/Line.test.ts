import { divideBySegments } from '@/LinearChart/Line/Line'

describe('divideBySegments', () => {
  it('если пропусков нет, возвращает 1 цельный сегмент', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points,
      },
    ])
  })

  it('если есть пропуск между значениями, возвращает 2 сплошных сегмента и 1 пунктирный посередине', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: null },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      },
      {
        type: 'dashed',
        points: [
          { x: 1, y: 1 },
          { x: 3, y: 3 },
        ],
      },
      {
        type: 'solid',
        points: [
          { x: 3, y: 3 },
          { x: 4, y: 4 },
        ],
      },
    ])
  })

  it('если пропуск между одиночными значениями, возвращает 1 пунктирный сегмент', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: null },
      { x: 2, y: 2 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'dashed',
        points: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
        ],
      },
    ])
  })

  it('если есть 2 пропуска подряд, объединяет их', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: null },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      },
      {
        type: 'dashed',
        points: [
          { x: 1, y: 1 },
          { x: 4, y: 4 },
        ],
      },
      {
        type: 'solid',
        points: [
          { x: 4, y: 4 },
          { x: 5, y: 5 },
        ],
      },
    ])
  })

  it('если пропуск после первого значения, начинает с пунктирного сегмента', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: null },
      { x: 2, y: null },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'dashed',
        points: [
          { x: 0, y: 0 },
          { x: 4, y: 4 },
        ],
      },
      {
        type: 'solid',
        points: [
          { x: 4, y: 4 },
          { x: 5, y: 5 },
        ],
      },
    ])
  })

  it('отсеивает пропуски в начале и конце', () => {
    const points = [
      { x: 0, y: null },
      { x: 1, y: null },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: null },
      { x: 6, y: null },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 4 },
        ],
      },
    ])
  })

  it('если пропуски вокруг одиночного значения, возвращает пунктирные сегменты', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: null },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: 4 },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'dashed',
        points: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
        ],
      },
      {
        type: 'dashed',
        points: [
          { x: 2, y: 2 },
          { x: 4, y: 4 },
        ],
      },
    ])
  })

  it('возвращает пустой массив, если всё пропуски', () => {
    const points = [
      { x: 0, y: null },
      { x: 1, y: null },
      { x: 2, y: null },
    ] as const

    expect(divideBySegments(points)).toEqual([])
  })

  it('возвращает пустой массив, если есть только 1 точка со значением', () => {
    const points = [
      { x: 0, y: null },
      { x: 1, y: null },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: null },
    ] as const

    expect(divideBySegments(points)).toEqual([])
  })
})
