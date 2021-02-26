import { isNegativeRate, replaceRateSign } from '../helpers'

describe('isNegativeNumber', () => {
  it('проверяет что число из строки положительное игнорируя все остальные символы', () => {
    const received = isNegativeRate(' +20% ')

    expect(received).toBeFalse()
  })

  it('проверяет что число из строки положительное', () => {
    const received = isNegativeRate('20')

    expect(received).toBeFalse()
  })

  it('проверяет что число из строки отрицательное игнорируя все остальные символы', () => {
    const received = isNegativeRate(' -20% ')

    expect(received).toBeTrue()
  })

  it('проверяет что число из строки отрицательное', () => {
    const received = isNegativeRate('-20')

    expect(received).toBeTrue()
  })

  it('игнорирует знак если он указан не перед числом', () => {
    const received = isNegativeRate('- 20')

    expect(received).toBeFalse()
  })

  it('проверяет только первое число из строки', () => {
    const received = isNegativeRate('10 -20')

    expect(received).toBeFalse()
  })
})

describe('replaceRateSign', () => {
  it('удаляет знаки из числа', () => {
    const positiveReceived = replaceRateSign('+10')
    const positiveExpected = '10'

    expect(positiveReceived).toBe(positiveExpected)

    const negativeReceived = replaceRateSign('-10')
    const negativeExpected = '10'

    expect(negativeReceived).toBe(negativeExpected)
  })

  it('удаляет знак только у первого числа в строке', () => {
    const received = replaceRateSign('-10 +10')
    const expected = '10 +10'

    expect(received).toBe(expected)
  })
})
