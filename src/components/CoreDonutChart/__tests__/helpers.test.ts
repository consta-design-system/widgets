import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array';

import {
  DEFAULT_SVG_OFFSET,
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  defaultSortValue,
  getArcMiddleInRadian,
  getArcRadiuses,
  getChartSize,
  getDonutMaxMinSizeRect,
  getDonutRadius,
  getGroupTransformTranslate,
  getMainRadius,
  getPadding,
  getPieData,
  getSizeDonut,
  getSvgOffset,
  getSvgSize,
  getSvgTextAnchor,
  getSvgTextDY,
  getValues,
  isEmptyPieArcDatum,
  MAX_CIRCLES_TO_RENDER,
} from '../helpers';

const LINES = [1, 2, 3] as const;

describe('getChartSize', () => {
  it('получение размера графика', () => {
    expect(getChartSize({ width: 400, height: 200 })).toEqual(200);
  });

  it('получение размера графика обрезанного по вертикали', () => {
    expect(
      getChartSize({ width: 100, height: 200, halfDonut: 'right' }),
    ).toEqual(200);
    expect(
      getChartSize({ width: 100, height: 200, halfDonut: 'left' }),
    ).toEqual(200);
  });

  it('получение размера графика обрезанного по горизонтали', () => {
    expect(getChartSize({ width: 200, height: 100, halfDonut: 'top' })).toEqual(
      200,
    );
    expect(
      getChartSize({ width: 200, height: 100, halfDonut: 'bottom' }),
    ).toEqual(200);
  });
});

describe('getPadding', () => {
  it('получение размера отступа между линиями графика', () => {
    expect(getPadding(1, 100)).toEqual(0);
    expect(getPadding(2, 100)).toEqual(8);
    expect(getPadding(3, 100)).toEqual(6);
  });
});

describe('getSizeDonut', () => {
  it('получение размера толщины линии графика', () => {
    expect(getSizeDonut(1, 100)).toEqual(12);
    expect(getSizeDonut(2, 100)).toEqual(10);
    expect(getSizeDonut(3, 100)).toEqual(8);
  });
});

describe('getDonutRadius', () => {
  const MAIN_RADIUS = 50;
  const COUNT_LINES = LINES.length;
  const SIZE = 100;

  it('получение размера радиуса первой линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 0,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    });

    expect(received).toEqual(50);
  });

  it('получение размера радиуса второй линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 1,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    });

    expect(received).toEqual(36);
  });

  it('получение размера радиуса третьей линии', () => {
    const received = getDonutRadius({
      mainRadius: MAIN_RADIUS,
      index: 2,
      circlesCount: COUNT_LINES,
      chartSize: SIZE,
    });

    expect(received).toEqual(22);
  });
});

describe('defaultGetCirclesCount', () => {
  it('возвращает количество линий', () => {
    expect(
      defaultGetCirclesCount([{ name: '', color: '', values: [0, 0] }]),
    ).toBe(2);
  });

  it('возвращает количество линий, если данные пустые', () => {
    expect(defaultGetCirclesCount([])).toEqual(0);
  });

  it('возвращает количество линий не больше максимального', () => {
    expect(
      defaultGetCirclesCount([
        { name: '', color: '', values: createArrayOfIndexes(10) },
      ]),
    ).toBe(MAX_CIRCLES_TO_RENDER);
  });
});

describe('defaultGetMinChartSize', () => {
  it('получение минимального размера графика', () => {
    expect(defaultGetMinChartSize(1, false)).toEqual(100);
  });
});

describe('getValues', () => {
  it('получает данные для одного кольца', () => {
    const received = getValues({
      data: [
        {
          color: 'red',
          name: 'Group 1',
          values: [1, 2, 3],
        },
      ],
      circlesCount: 1,
    });

    expect(received).toEqual([[{ color: 'red', name: 'Group 1', value: 1 }]]);
  });

  it('Получает данные для трех колец', () => {
    const received = getValues({
      data: [
        {
          color: 'red',
          name: 'Group 1',
          values: [1, 2, 3],
        },
      ],
      circlesCount: 3,
    });

    expect(received).toEqual([
      [{ color: 'red', name: 'Group 1', value: 1 }],
      [{ color: 'red', name: 'Group 1', value: 2 }],
      [{ color: 'red', name: 'Group 1', value: 3 }],
    ]);
  });

  it('Получает данные для трех колец, если исходные данные пустые', () => {
    const received = getValues({
      data: [],
      circlesCount: 3,
    });

    expect(received).toEqual([[], [], []]);
  });

  it('Получает данные для трех колец с сортировкой', () => {
    const received = getValues({
      data: [
        {
          color: 'red',
          name: 'Group 1',
          values: [4, 5, 6],
        },
        {
          color: 'blue',
          name: 'Group 2',
          values: [1, 2, 3],
        },
      ],
      circlesCount: 3,
      sortValue: defaultSortValue,
    });

    expect(received).toEqual([
      [
        { color: 'red', name: 'Group 1', value: 4 },
        { color: 'blue', name: 'Group 2', value: 1 },
      ],
      [
        { color: 'red', name: 'Group 1', value: 5 },
        { color: 'blue', name: 'Group 2', value: 2 },
      ],
      [
        { color: 'red', name: 'Group 1', value: 6 },
        { color: 'blue', name: 'Group 2', value: 3 },
      ],
    ]);
  });
});

describe('getPieData', () => {
  it('получение данных для кольца, если исходные данные пустые', () => {
    const received = getPieData([]);

    expect(received).toEqual([]);
  });

  it('получение данных для кольца', () => {
    const received = getPieData([
      { color: 'red', name: 'Group 1', value: null },
    ]);

    expect(received).toEqual([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ]);
  });
});

describe('getArcRadiuses', () => {
  it('получение радиусов для дуг', () => {
    const received = getArcRadiuses({
      mainRadius: 100,
      circlesCount: 3,
      sizeDonut: 5,
      chartSize: 200,
    });

    expect(received).toEqual([
      { inner: 95, outer: 100 },
      { inner: 67, outer: 72 },
      { inner: 39, outer: 44 },
    ]);
  });
});

describe('isEmptyPieArcDatum', () => {
  it('возвращает true если передать пустой массив', () => {
    const received = isEmptyPieArcDatum([]);

    expect(received).toBeTrue();
  });

  it('возвращает true если передать массив в котором у всех элементов в качестве значения дуги 0', () => {
    const received = isEmptyPieArcDatum([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ]);

    expect(received).toBeTrue();
  });

  it('возвращает false если передать массив в котором хотя бы у одной дуги значение не равняется 0', () => {
    const received = isEmptyPieArcDatum([
      {
        data: { color: 'red', name: 'Group 1', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 1,
      },
      {
        data: { color: 'red', name: 'Group 2', value: null },
        endAngle: 0,
        index: 0,
        padAngle: 0,
        startAngle: 0,
        value: 0,
      },
    ]);

    expect(received).toBeFalse();
  });
});

describe('getDonutMaxMinSizeRect', () => {
  it('получение стилей для минимального и максимального размера графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      minChartSize: 50,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: undefined,
    });
  });

  it('получение стилей для минимального и максимального размера обрезанного по горизонтали графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      halfDonut: 'top',
      minChartSize: 50,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 25,
      maxHeight: undefined,
    });
  });

  it('получение стилей для минимального и максимального размера обрезанного по вертикале графика', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      halfDonut: 'right',
      minChartSize: 50,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      minWidth: 25,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: undefined,
    });
  });

  it('получение стилей для минимального и максимального размера полного графика с ограничение максимального размера по высоте', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      minChartSize: 50,
      limitSizeSide: 'height',
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: undefined,
      minHeight: 50,
      maxHeight: 100,
    });
  });

  it('получение стилей для минимального и максимального размера полного графика с ограничение максимального размера по ширине', () => {
    const received = getDonutMaxMinSizeRect({
      height: 100,
      width: 100,
      minChartSize: 50,
      limitSizeSide: 'width',
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      minWidth: 50,
      maxWidth: 100,
      minHeight: 50,
      maxHeight: undefined,
    });
  });
});

describe('getSvgTextDY', () => {
  it('получение сдвига текст по Y для 160 градусов', () => {
    const received = getSvgTextDY(160);

    expect(received).toEqual('1em');
  });

  it('получение сдвига текст по Y для 80 и 270 градусов', () => {
    [80, 270].map((deg) => {
      const received = getSvgTextDY(deg);

      expect(received).toEqual('0.35em');
    });
  });

  it('получение сдвига текст по Y для 300, 360 и 60 градусов', () => {
    [300, 360, 60].map((deg) => {
      const received = getSvgTextDY(deg);

      expect(received).toEqual('-0.35em');
    });
  });
});

describe('getArcMiddleInRadian', () => {
  it('получение цента дуги по начальной и конечной точке', () => {
    const received = getArcMiddleInRadian({ startAngle: 0, endAngle: 10 });

    expect(received).toEqual(5);
  });
});

describe('getSvgTextAnchor', () => {
  it('получение выравнивания текста по центру', () => {
    [0, 180].map((deg) => {
      const received = getSvgTextAnchor(deg);

      expect(received).toEqual('middle');
    });
  });

  it('получение выравнивания текста по началу', () => {
    const received = getSvgTextAnchor(100);

    expect(received).toEqual('start');
  });

  it('получение выравнивания текста по концу', () => {
    const received = getSvgTextAnchor(280);

    expect(received).toEqual('end');
  });

  it('получение выравнивания текста для графика обрезанного слева', () => {
    const received = getSvgTextAnchor(0, 'left');

    expect(received).toEqual('start');
  });

  it('получение выравнивания текста для графика обрезанного справа', () => {
    const received = getSvgTextAnchor(0, 'right');

    expect(received).toEqual('end');
  });
});

describe('getGroupTransformTranslate', () => {
  const SVG_OFFSET = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  it('получение сдвига элементов графика', () => {
    const received = getGroupTransformTranslate({
      radius: 50,
      svgOffset: SVG_OFFSET,
    });

    expect(received).toEqual('translate(50, 50)');
  });

  it('получение сдвига элементов графика обрезанного сверху', () => {
    const received = getGroupTransformTranslate({
      radius: 50,
      svgOffset: SVG_OFFSET,
      halfDonut: 'top',
    });

    expect(received).toEqual('translate(50, 0)');
  });

  it('получение сдвига элементов графика обрезанного справа', () => {
    const received = getGroupTransformTranslate({
      radius: 50,
      svgOffset: SVG_OFFSET,
      halfDonut: 'right',
    });

    expect(received).toEqual('translate(50, 50)');
  });

  it('получение сдвига элементов графика обрезанного снизу', () => {
    const received = getGroupTransformTranslate({
      radius: 50,
      svgOffset: SVG_OFFSET,
      halfDonut: 'bottom',
    });

    expect(received).toEqual('translate(50, 50)');
  });

  it('получение сдвига элементов графика обрезанного слева', () => {
    const received = getGroupTransformTranslate({
      radius: 50,
      svgOffset: SVG_OFFSET,
      halfDonut: 'left',
    });

    expect(received).toEqual('translate(0, 50)');
  });
});

describe('getSvgOffset', () => {
  const ARC_RECT = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };
  const LABELS_RECT = {
    x: -40,
    y: -20,
    width: 180,
    height: 120,
  };

  it('получение отступа вокруг окружности графика', () => {
    const received = getSvgOffset({
      arcsRect: ARC_RECT,
      labelsRect: LABELS_RECT,
    });

    expect(received).toEqual({
      top: 20,
      right: 40,
      bottom: 20,
      left: 40,
    });
  });
});

describe('getSvgSize', () => {
  it('получение размера SVG элемента', () => {
    const received = getSvgSize({
      diameter: 100,
      radius: 50,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual({
      width: 100,
      height: 100,
    });
  });

  it('получение размера SVG элемента с учетом отступов вокруг окружности', () => {
    const received = getSvgSize({
      diameter: 100,
      radius: 50,
      svgOffset: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 40,
      },
    });

    expect(received).toEqual({
      width: 140,
      height: 140,
    });
  });
});

describe('getMainRadius', () => {
  it('получение основного радиуса', () => {
    const received = getMainRadius({
      width: 200,
      height: 200,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual(100);
  });

  it('получение минимального основного радиуса', () => {
    const received = getMainRadius({
      width: 100,
      height: 200,
      svgOffset: DEFAULT_SVG_OFFSET,
    });

    expect(received).toEqual(50);
  });

  it('получение основного радиуса окружности с учетом отступов', () => {
    const received = getMainRadius({
      width: 400,
      height: 400,
      svgOffset: { top: 20, right: 50, bottom: 10, left: 20 },
    });

    expect(received).toEqual(165);
  });
});
