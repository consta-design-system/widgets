import { NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

import { defaultFormatter, isNegativeRate, replaceRateSign } from '../helpers'

describe('defaultFormatter', () => {
  it('добавляет отбивку в числа', () => {
    const received = defaultFormatter('1000')
    const expected = `1${NARROW_NO_BREAK_SPACE}000`

    expect(received).toBe(expected)
  })

  it('добавляет отбивку в числа игнорируя дробную часть', () => {
    const received = defaultFormatter('1000.0001')
    const expected = `1${NARROW_NO_BREAK_SPACE}000,0001`

    expect(received).toBe(expected)
  })

  it('заменяет дробный разделитель по умолчанию на запятую', () => {
    const received = defaultFormatter('100.99')
    const expected = '100,99'

    expect(received).toBe(expected)
  })

  it('заменяет дробный разделитель по умолчанию на запятую игнорируя весь остальной текст', () => {
    const received = defaultFormatter('Какой-то комментарий. 199.99')
    const expected = 'Какой-то комментарий. 199,99'

    expect(received).toBe(expected)
  })

  it('заменяет дробный разделитель по умолчанию на запятую во всех числах', () => {
    const received = defaultFormatter('10.1 | 10.2 | 10.3 | 10.4')
    const expected = '10,1 | 10,2 | 10,3 | 10,4'

    expect(received).toBe(expected)
  })

  it('форматирует и числовые данные', () => {
    const received = defaultFormatter(1000.0001)
    const expected = `1${NARROW_NO_BREAK_SPACE}000,0001`

    expect(received).toBe(expected)
  })
})

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
