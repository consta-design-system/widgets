import { getSections } from '../helpers'

const scaler = (value: number) => {
  return value
}

describe('getSections', () => {
  it('получение секций колонки', () => {
    const result = getSections({ sections: undefined, scaler })

    expect(result).toEqual([])
  })

  it('Получение секций колонки, если список секций пустой', () => {
    const result = getSections({ sections: [], scaler })

    expect(result).toEqual([])
  })

  it('Получение секций колонки, с пустыми значениями в секциях', () => {
    const result = getSections({
      sections: [
        { color: 'red', value: 4 },
        { color: 'blue', value: undefined },
      ],
      scaler,
    })

    expect(result).toEqual([
      { color: 'red', value: 4, length: 4 },
      { color: 'blue', value: undefined },
    ])
  })

  it('Получение секций колонки, с укороченными длинными секциями', () => {
    const result = getSections({
      sections: [
        { color: 'red', value: 90 },
        { color: 'blue', value: 1 },
        { color: 'yellow', value: 1 },
        { color: 'aquamarine', value: 1 },
        { color: 'black', value: 1 },
        { color: 'orange', value: 6 },
      ],
      scaler,
    })

    expect(result).toEqual([
      { color: 'red', value: 90, length: 90 },
      { color: 'blue', value: 1, length: 1 },
      { color: 'yellow', value: 1, length: 1 },
      { color: 'aquamarine', value: 1, length: 1 },
      { color: 'black', value: 1, length: 1 },
      { color: 'orange', value: 6, length: 6 },
    ])
  })
})
