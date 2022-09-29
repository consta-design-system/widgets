import { numberFormatter } from '../formatters';
import { NARROW_NO_BREAK_SPACE } from '../symbols';

describe('defaultFormatter', () => {
  it('добавляет отбивку в числа', () => {
    const received = numberFormatter('1000');
    const expected = `1${NARROW_NO_BREAK_SPACE}000`;

    expect(received).toBe(expected);
  });

  it('добавляет отбивку в числа игнорируя дробную часть', () => {
    const received = numberFormatter('1000.0001');
    const expected = `1${NARROW_NO_BREAK_SPACE}000,0001`;

    expect(received).toBe(expected);
  });

  it('заменяет дробный разделитель по умолчанию на запятую', () => {
    const received = numberFormatter('100.99');
    const expected = '100,99';

    expect(received).toBe(expected);
  });

  it('заменяет дробный разделитель по умолчанию на запятую игнорируя весь остальной текст', () => {
    const received = numberFormatter('Какой-то комментарий. 199.99');
    const expected = 'Какой-то комментарий. 199,99';

    expect(received).toBe(expected);
  });

  it('заменяет дробный разделитель по умолчанию на запятую во всех числах', () => {
    const received = numberFormatter('10.1 | 10.2 | 10.3 | 10.4');
    const expected = '10,1 | 10,2 | 10,3 | 10,4';

    expect(received).toBe(expected);
  });

  it('форматирует и числовые данные', () => {
    const received = numberFormatter(1000.0001);
    const expected = `1${NARROW_NO_BREAK_SPACE}000,0001`;

    expect(received).toBe(expected);
  });
});
