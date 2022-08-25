import { getSize } from '../helpers';

describe('getSize', () => {
  it('получение настроек размера секции для вертикального графика', () => {
    expect(getSize(100, false, false, 1, 1)).toEqual({
      width: undefined,
      height: '100%',
    });
  });

  it('получение настроек размера секции для горизонтального графика', () => {
    expect(getSize(100, true, false, 1, 1)).toEqual({
      width: '100%',
      height: undefined,
    });
  });

  it('получение настроек размера секции с отрицательным значением для вертикального графика', () => {
    expect(getSize(-100, false, false, 1, 1)).toEqual({
      width: undefined,
      height: '100%',
    });
  });

  it('получение настроек размера секции для вертикального графика с переполнением', () => {
    expect(getSize(100, true, true, 2, 1)).toEqual({
      width: '105%',
      height: undefined,
      margin: '0 -10px 0 0',
    });
  });

  it('получение настроек размера секции для горизонтального графика с переполнением', () => {
    expect(getSize(100, false, true, 2, 1)).toEqual({
      width: undefined,
      height: '105%',
      margin: '-10px 0 0 0',
    });
  });
});
