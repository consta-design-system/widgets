import { getScaler } from '##/components/CoreBarChart/helpers';
import { NumberRange } from '##/utils/scale';

import { SectionItem } from '../CoreBarChartColumn/CoreBarChartColumn';

export const getSections = ({
  sections,
  scaler,
}: {
  sections?: readonly SectionItem[];
  scaler: (value: number) => number;
}): readonly SectionItem[] => {
  return (sections || []).map((section) => {
    if (section.value === undefined) {
      return section;
    }

    return {
      ...section,
      length: scaler(section.value),
    };
  });
};

export const styleOrientation = (
  isHorizontal: boolean,
  scaler: (column: number) => void,
  gridDomain: NumberRange,
  column?: number,
) => {
  if (column) {
    if (column >= 0 && gridDomain[1] > 0) {
      return !isHorizontal
        ? { minHeight: `${scaler(gridDomain[1])}%`, maxWidth: '70%' }
        : { minWidth: `${scaler(gridDomain[1])}%`, maxHeight: '70%' };
    }
    if (column <= 0 && gridDomain[0] < 0) {
      return !isHorizontal
        ? { minHeight: `${scaler(Math.abs(gridDomain[0]))}%`, maxWidth: '70%' }
        : { minWidth: `${scaler(Math.abs(gridDomain[0]))}%`, maxHeight: '70%' };
    }
    return !isHorizontal
      ? { minHeight: `${scaler(column)}%`, maxWidth: '70%' }
      : { minWidth: `${scaler(column)}%`, maxHeight: '70%' };
  }
};

export const scalerCommonColumnsGroups =
  (
    columnLength: number,
    gridDomain: NumberRange,
    reversedColumnLength?: number,
  ) =>
  (value: number) => {
    if (
      columnLength === 0 &&
      gridDomain[1] > 0 &&
      reversedColumnLength &&
      gridDomain[0] > reversedColumnLength
    ) {
      const scalerColumn = getScaler(
        gridDomain[1] + Math.abs(reversedColumnLength),
      );
      const scaler = scalerColumn(value);

      return scaler;
    }
    if (
      reversedColumnLength === 0 &&
      gridDomain[0] < 0 &&
      gridDomain[1] < columnLength
    ) {
      const scalerReversedColumn = getScaler(
        columnLength + Math.abs(gridDomain[0]),
      );
      const scaler = scalerReversedColumn(value);

      return scaler;
    }
    if (
      columnLength > gridDomain[1] &&
      reversedColumnLength &&
      reversedColumnLength < gridDomain[0]
    ) {
      const scalerColumns = getScaler(
        columnLength + Math.abs(reversedColumnLength),
      );
      const scaler = scalerColumns(value);

      return scaler;
    }
    const scalerGridDomain = getScaler(gridDomain[1] + Math.abs(gridDomain[0]));
    const scaler = scalerGridDomain(value);

    return scaler;
  };

export const getSizeGroupsLimit = (
  isHorizontal: boolean,
  limitMinimumStepSize: boolean,
) => {
  if (!isHorizontal && limitMinimumStepSize) {
    return 'vertical';
  }
  if (isHorizontal && limitMinimumStepSize) {
    return 'horizontal';
  }
  return '';
};
