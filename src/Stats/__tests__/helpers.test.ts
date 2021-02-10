import { NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

import { defaultValueFormatter } from '../helpers'

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
