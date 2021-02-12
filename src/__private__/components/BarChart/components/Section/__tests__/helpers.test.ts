import { getSize } from '../helpers'

describe('getSize', () => {
  it('получение настроек размера секции для вертикального графика', () => {
    expect(getSize(100, false)).toEqual({ width: undefined, height: '100%' })
  })

  it('получение настроек размера секции для горизонтального графика', () => {
    expect(getSize(100, true)).toEqual({ width: '100%', height: undefined })
  })

  it('получение настроек размера секции с отрицательным значением для вертикального графика', () => {
    expect(getSize(-100, false)).toEqual({ width: undefined, height: '100%' })
  })
})
