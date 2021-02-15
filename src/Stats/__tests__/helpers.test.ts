import { NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

import { defaultValueFormatter, isNegativeRate } from '../helpers'

describe('defaultValueFormatter', () => {
  it('добавляет отбивку в числа', () => {
    const received = defaultValueFormatter(1000)
    const expected = `1${NARROW_NO_BREAK_SPACE}000`

    expect(received).toBe(expected)
  })

  it('заменяет дробный разделитель по умолчанию на запятую', () => {
    const received = defaultValueFormatter(100.99)
    const expected = '100,99'

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

  it('выбирает первое число из строки', () => {
    const received = isNegativeRate('10 -20')

    expect(received).toBeFalse()
  })
})
