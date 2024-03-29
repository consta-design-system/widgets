import { Threshold } from '##/components/CoreBarChart/CoreBarChart';
import { GroupItem } from '##/components/CoreBarChart/CoreBarChartGroup/CoreBarChartGroup';

import {
  defaultGetAxisShowPositions,
  getColumnSize,
  getCommonGroupsMaxColumns,
  getEveryNTick,
  getGraphStepSize,
  getGridColumnGap,
  getGridRowGap,
  getGridSettings,
  getGroupsDomain,
  getLabelGridAreaName,
  getRange,
  getScaler,
  getTotalByColumn,
  getValuesDomain,
  isMultiColumn,
  isShowReversed,
} from '../helpers';

describe('getEveryNTick', () => {
  it('получение каждой засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 1)).toEqual([0, 1, 2, 3, 4]);
  });

  it('получение каждой второй засечки', () => {
    expect(getEveryNTick([0, 1, 2, 3, 4], 2)).toEqual([0, 2, 4]);
  });

  it('получение каждой засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-3, -2, -1, 0, 1, 2, 3], 1)).toEqual([
      -3, -2, -1, 0, 1, 2, 3,
    ]);
  });

  it('получение каждой второй засечки, с учетом отрицательных значений', () => {
    expect(getEveryNTick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 2)).toEqual([
      -4, -2, 0, 2, 4,
    ]);
  });
});

describe('getGraphStepSize', () => {
  it('возвращает размер графика, как размер группы если массив размеров пуст', () => {
    expect(getGraphStepSize(450, [])).toEqual(450);
  });

  it('возвращает размер графика, как размер группы если массив размеров содержит 1 элемент', () => {
    expect(getGraphStepSize(450, [50])).toEqual(450);
  });

  it('возвращает значение размера шага второй группы, если их всего 2', () => {
    expect(getGraphStepSize(450, [250, 50])).toEqual(200);
  });

  it('возвращает значение размера шага группы', () => {
    expect(getGraphStepSize(450, [150, 50, 50, 150])).toEqual(75);
  });
});

describe('getRange', () => {
  it('возвращает диапазон', () => {
    expect(getRange(100)).toEqual([0, 100]);
  });

  it('возвращает перевернутый диапазон', () => {
    expect(getRange(100, true)).toEqual([100, 0]);
  });
});

describe('getTotalByColumn', () => {
  it('возвращает 0 если в колонке нет данных', () => {
    expect(getTotalByColumn(undefined)).toEqual(0);
  });

  it('возвращает сумму значений секций', () => {
    expect(getTotalByColumn({ total: 45 })).toEqual(45);
  });

  it('возвращает сумму значений секций с отрицательными значениями', () => {
    expect(getTotalByColumn({ total: -40 })).toEqual(-40);
  });
});

describe('defaultGetGroupsDomain', () => {
  const groups: readonly GroupItem[] = [
    {
      name: 'группа 1',
      columns: [],
      reversedColumns: [],
    },
    {
      name: 'группа 2',
      columns: [],
      reversedColumns: [],
    },
    {
      name: 'группа 3',
      columns: [],
      reversedColumns: [],
    },
  ];

  it('возвращает массив названий групп', () => {
    expect(getGroupsDomain(groups)).toEqual([
      'группа 1',
      'группа 2',
      'группа 3',
    ]);
  });
});

describe('getColumnSize', () => {
  it('возвращает размер бара, который зависит от размера текста', () => {
    expect(
      getColumnSize({ size: 'auto', valueLength: 1, isHorizontal: false }),
    ).toEqual('s');
    expect(
      getColumnSize({ size: 'auto', valueLength: 2, isHorizontal: false }),
    ).toEqual('m');
    expect(
      getColumnSize({ size: 'auto', valueLength: 3, isHorizontal: false }),
    ).toEqual('xl');
    expect(
      getColumnSize({ size: 'auto', valueLength: 4, isHorizontal: false }),
    ).toEqual('2xl');
    expect(
      getColumnSize({ size: 'auto', valueLength: 5, isHorizontal: false }),
    ).toEqual('3xl');
  });

  it('возвращает размер m для горизонтального графика', () => {
    expect(
      getColumnSize({ size: 'auto', valueLength: 5, isHorizontal: true }),
    ).toEqual('m');
  });

  it('возвращает заданный размер', () => {
    expect(
      getColumnSize({ size: 'm', valueLength: 5, isHorizontal: true }),
    ).toEqual('m');
    expect(
      getColumnSize({ size: 's', valueLength: 10, isHorizontal: false }),
    ).toEqual('s');
    expect(
      getColumnSize({ size: 'l', valueLength: 0, isHorizontal: true }),
    ).toEqual('l');
    expect(
      getColumnSize({ size: 'xl', valueLength: 15, isHorizontal: false }),
    ).toEqual('xl');
  });
});

describe('defaultGetAxisShowPositions', () => {
  it('получение настроек расположения осей для вертикального графика без отрицательных значений', () => {
    const result = defaultGetAxisShowPositions({
      isHorizontal: false,
      showReversed: false,
    });

    expect(result).toEqual({
      top: false,
      right: false,
      bottom: true,
      left: true,
    });
  });

  it('получения настроек расположения осей для горизонтального графика без отрицательных значений', () => {
    const result = defaultGetAxisShowPositions({
      isHorizontal: true,
      showReversed: false,
    });

    expect(result).toEqual({
      top: false,
      right: false,
      bottom: true,
      left: true,
    });
  });

  it('получение настроек расположения осей для вертикального графика с отрицательными значениями', () => {
    const result = defaultGetAxisShowPositions({
      isHorizontal: false,
      showReversed: true,
    });

    expect(result).toEqual({
      top: true,
      right: false,
      bottom: true,
      left: true,
    });
  });

  it('получение настроек расположения осей для горизонтального графика с отрицательными значениями', () => {
    const result = defaultGetAxisShowPositions({
      isHorizontal: true,
      showReversed: true,
    });

    expect(result).toEqual({
      top: false,
      right: true,
      bottom: true,
      left: true,
    });
  });
});

describe('getValuesDomain', () => {
  const groups: readonly GroupItem[] = [
    {
      name: '1',
      columns: [{ total: 50 }, { total: 45 }],
      reversedColumns: [{ total: 100 }],
    },
  ];

  const threshold: Threshold = { value: 120 };

  it('возвращает значение для домена', () => {
    const result = getValuesDomain({ groups });

    expect(result).toEqual([0, 100]);
  });

  it('возвращает значения для домена с перевернутыми колонками', () => {
    const result = getValuesDomain({ groups });

    expect(result).toEqual([0, 100]);
  });

  it('возвращает значения для домена с предельным значением', () => {
    const result = getValuesDomain({ groups, threshold });

    expect(result).toEqual([45, 120]);
  });

  it('возвращает значения для домена с предельным значением с перевернутыми колонками', () => {
    const result = getValuesDomain({ groups, threshold });

    expect(result).toEqual([45, 120]);
  });
});

describe('getScaler', () => {
  it('возвращает отскалированное значение', () => {
    const scaler = getScaler(100);

    expect(scaler(50)).toEqual(50);
    expect(scaler(200)).toEqual(100);
  });
});

describe('getGridSettings', () => {
  describe('горизонтальный график', () => {
    it('возвращает настройки для грида без осей', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: false,
          bottom: false,
          left: false,
          right: false,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto',
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"group0" "group1" "group2" "bottomUnit"',
      });
    });

    it('возвращает настройки для грида с осями внизу и слева', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: false,
          bottom: true,
          left: true,
          right: false,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto auto',
        gridTemplateColumns: 'fit-content(25%) 1fr',
        gridTemplateAreas:
          '"labelLeft0 group0" ' +
          '"labelLeft1 group1" ' +
          '"labelLeft2 group2" ' +
          '"bottomLeft bottomTicks" ' +
          '"bottomLeft bottomUnit"',
      });
    });

    it('возвращает настройки для грида со всеми осями', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: true,
          bottom: true,
          left: true,
          right: true,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr 1fr 1fr auto auto',
        gridTemplateColumns: 'fit-content(25%) 1fr fit-content(25%)',
        gridTemplateAreas:
          '"topLeft topTicks topRight" ' +
          '"labelLeft0 group0 labelRight0" ' +
          '"labelLeft1 group1 labelRight1" ' +
          '"labelLeft2 group2 labelRight2" ' +
          '"bottomLeft bottomTicks bottomRight" ' +
          '"bottomLeft bottomUnit bottomUnit"',
      });
    });

    it('возвращает настройки для грида с юнитами', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: false,
          bottom: true,
          left: true,
          right: false,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto auto',
        gridTemplateColumns: 'fit-content(25%) 1fr',
        gridTemplateAreas:
          '"labelLeft0 group0" ' +
          '"labelLeft1 group1" ' +
          '"labelLeft2 group2" ' +
          '"bottomLeft bottomTicks" ' +
          '"bottomLeft bottomUnit"',
      });
    });

    it('возвращает настройки для грида с осями слева-справа и юнитами', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: false,
          bottom: false,
          left: true,
          right: true,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: '1fr 1fr 1fr auto',
        gridTemplateColumns: 'fit-content(25%) 1fr fit-content(25%)',
        gridTemplateAreas:
          '"labelLeft0 group0 labelRight0" ' +
          '"labelLeft1 group1 labelRight1" ' +
          '"labelLeft2 group2 labelRight2" ' +
          '"bottomLeft bottomUnit bottomUnit"',
      });
    });

    it('возвращает настройки для грида с осями внизу-вверху и юнитом внизу', () => {
      const result = getGridSettings({
        isHorizontal: true,
        countGroups: 3,
        axisShowPositions: {
          top: true,
          bottom: true,
          left: false,
          right: false,
        },
      });

      expect(result).toEqual({
        gridTemplateRows: 'auto 1fr 1fr 1fr auto auto',
        gridTemplateColumns: '1fr',
        gridTemplateAreas:
          '"topTicks" ' +
          '"group0" ' +
          '"group1" ' +
          '"group2" ' +
          '"bottomTicks" ' +
          '"bottomUnit"',
      });
    });
  });

  describe('вертикальный график', () => {
    it('возвращает настройки для грида', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
      });

      expect(result).toEqual({
        gridTemplateRows: 'fit-content(20%) 1fr auto auto',
        gridTemplateColumns: 'fit-content(20%) 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ' +
          '"bottomLeft bottomUnit bottomUnit bottomUnit"',
      });
    });

    it('возвращает настройки для грида с юнитами', () => {
      const result = getGridSettings({
        isHorizontal: false,
        countGroups: 3,
      });

      expect(result).toEqual({
        gridTemplateRows: 'fit-content(20%) 1fr auto auto',
        gridTemplateColumns: 'fit-content(20%) 1fr 1fr 1fr',
        gridTemplateAreas:
          '"topLeft labelTop0 labelTop1 labelTop2" ' +
          '"leftTicks group0 group1 group2" ' +
          '"bottomLeft labelBottom0 labelBottom1 labelBottom2" ' +
          '"bottomLeft bottomUnit bottomUnit bottomUnit"',
      });
    });
  });
});

describe('getLabelGridAreaName', () => {
  it('получение названия области сетки для подписи группы', () => {
    const result = getLabelGridAreaName('top')(0);

    expect(result).toEqual('labelTop0');
  });
});

describe('isShowReversed', () => {
  it('определяет необходимость отображения перевернутых групп, если список групп пустой', () => {
    const result = isShowReversed({
      groups: [],
    });

    expect(result).toBe(false);
  });

  it('определяет необходимость отображения перевернутых групп, если список колонок пустой', () => {
    const result = isShowReversed({
      groups: [{ name: 'Группа 1', columns: [], reversedColumns: [] }],
    });

    expect(result).toBe(false);
  });

  it('определяет необходимость отображения перевернутых групп, если список колонок пустой и порог положительный', () => {
    const result = isShowReversed({
      groups: [{ name: 'Группа 1', columns: [], reversedColumns: [] }],
      threshold: { value: 100 },
    });

    expect(result).toBe(false);
  });

  it('определяет необходимость отображения перевернутых групп', () => {
    const result = isShowReversed({
      groups: [
        {
          name: 'Группа 1',
          columns: [],
          reversedColumns: [
            {
              total: 100,
              sections: [{ color: 'red', value: 100, length: 100 }],
            },
          ],
        },
      ],
    });

    expect(result).toBe(true);
  });

  it('определяет необходимость отображения перевернутых групп, если список колонок пустой и порог отрицательный', () => {
    const result = isShowReversed({
      groups: [{ name: 'Группа 1', columns: [], reversedColumns: [] }],
      threshold: { value: -100 },
    });

    expect(result).toBe(true);
  });
});

describe('isMultiColumn', () => {
  it('возвращает false, если список групп пустой', () => {
    const result = isMultiColumn([]);

    expect(result).toBe(false);
  });

  it('возвращает false, если список колонок пуст', () => {
    const result = isMultiColumn([
      {
        name: 'Группа 1',
        columns: [],
        reversedColumns: [],
      },
    ]);

    expect(result).toBe(false);
  });

  it('возвращает false, если в списках не больше одной колонки', () => {
    const result = isMultiColumn([
      {
        name: 'Группа 1',
        columns: [{ total: 0, sections: [] }],
        reversedColumns: [{ total: 0, sections: [] }],
      },
    ]);

    expect(result).toBe(false);
  });

  it('возвращает true, если длина списка обычных колонок больше одного', () => {
    const result = isMultiColumn([
      {
        name: 'Группа 1',
        columns: [
          { total: 0, sections: [] },
          { total: 0, sections: [] },
        ],
        reversedColumns: [{ total: 0, sections: [] }],
      },
    ]);

    expect(result).toBe(true);
  });

  it('возвращает true, если длина списка перевернутых колонок больше одного', () => {
    const result = isMultiColumn([
      {
        name: 'Группа 1',
        columns: [{ total: 0, sections: [] }],
        reversedColumns: [
          { total: 0, sections: [] },
          { total: 0, sections: [] },
        ],
      },
    ]);

    expect(result).toBe(true);
  });
});

describe('getCommonGroupsMaxColumns', () => {
  it('получение максимального количества колонок в группах, если список групп пуст', () => {
    const result = getCommonGroupsMaxColumns([]);

    expect(result).toEqual(0);
  });

  it('получение максимального количества колонок в группах', () => {
    const result = getCommonGroupsMaxColumns([
      {
        name: 'Группа 1',
        columns: [
          { total: 0, sections: [] },
          { total: 0, sections: [] },
        ],
        reversedColumns: [
          { total: 0, sections: [] },
          { total: 0, sections: [] },
          { total: 0, sections: [] },
        ],
      },
    ]);

    expect(result).toEqual(3);
  });
});

describe('getGridRowGap', () => {
  it('получение отступов для грида', () => {
    expect(getGridRowGap('s')).toEqual('var(--space-2xs)');
    expect(getGridRowGap('m')).toEqual('var(--space-xs)');
    expect(getGridRowGap('l')).toEqual('var(--space-xs)');
  });

  it('получение отступов для горизонтального грида', () => {
    expect(getGridRowGap('s', true)).toEqual('var(--space-xs)');
    expect(getGridRowGap('m', true)).toEqual('var(--space-m)');
    expect(getGridRowGap('l', true)).toEqual('var(--space-xs)');
  });
});

describe('getGridColumnGap', () => {
  it('получение отступов для грида', () => {
    expect(getGridColumnGap('s')).toEqual('var(--space-xs)');
    expect(getGridColumnGap('m')).toEqual('var(--space-m)');
    expect(getGridColumnGap('l')).toEqual('var(--space-m)');
  });
});
