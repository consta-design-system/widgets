import { useLayoutEffect, useState } from 'react';

import { Threshold } from '##/components/CoreBarChart/CoreBarChart';
import { getEveryN, sum } from '##/utils/array';
import { NumberRange } from '##/utils/scale';
import { isTruthy } from '##/utils/type-guards';

import { ColumnItem, GroupItem } from './CoreBarChartGroup/CoreBarChartGroup';
import { Position } from './CoreBarChartTicks/CoreBarChartTicks';

export const barCharSizes = [
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  'auto',
] as const;
export type Size = typeof barCharSizes[number];
export type ColumnSize = Exclude<Size, 'auto'>;
export type ShowPositions = {
  // eslint-disable-next-line no-unused-vars
  [key in Position]: boolean;
};

export type GetGroupsDomain = (
  groups: readonly GroupItem[],
) => readonly string[];

export type GetValuesDomain = (params: {
  groups: readonly GroupItem[];
  min?: number;
  max?: number;
  threshold?: Threshold;
}) => NumberRange;

export type GetAxisShowPositions = (params: {
  isHorizontal: boolean;
  showReversed: boolean;
}) => ShowPositions;

export const CHART_MIN_HEIGHT = 153;

export type TypeColumn = 'columns' | 'reversedColumns';

export const getRange = (size: number, shouldFlip?: boolean): NumberRange => {
  return shouldFlip ? [size, 0] : [0, size];
};

export const getTotalByColumn = (column: ColumnItem | undefined) => {
  return column ? column.total : 0;
};

const getValueY = (value: number, filter: (value: number) => boolean) => {
  if (value !== null && filter(value)) {
    return value;
  }

  return null;
};

export const getValuesDomain: GetValuesDomain = ({
  groups,
  min,
  max,
  threshold,
}) => {
  const numbers = groups
    .map(({ columns, reversedColumns }) =>
      columns.concat(reversedColumns).map(getTotalByColumn),
    )
    .flat();

  const thresholdValue = threshold?.value ?? 0;
  const maxNumber = Math.max(...numbers, Math.abs(thresholdValue), 0);
  const minNumber = Math.min(...numbers, Math.abs(thresholdValue));

  const maxValue = max && getValueY(max, (v) => v >= 0);
  const minValue = min && getValueY(min, (v) => v < 0);

  if ((maxValue || maxValue === 0) && (minValue || minValue === 0)) {
    return [minValue, maxValue];
  }
  if (!maxValue && minValue) {
    return [minValue, maxNumber];
  }
  if (maxValue && !minValue) {
    return [minNumber, maxValue];
  }
  return [minNumber, maxNumber];
};

export const getGroupsDomain: GetGroupsDomain = (groups) => {
  return groups.map((g) => g.name);
};

export const getEveryNTick = (items: readonly number[], n: number) => {
  const isNegative = Math.min(...items) < 0;
  if (isNegative) {
    const zeroIndex = items.findIndex((item) => item === 0);
    const positiveTicks = getEveryN(items.slice(zeroIndex), n);
    const negativeTicks = positiveTicks
      .slice(1)
      .reverse()
      .map((tick) => tick * -1);

    return [...negativeTicks, ...positiveTicks];
  }

  return getEveryN(items, n);
};

export const getGraphStepSize = (
  graphSize: number,
  groupsSizes: readonly number[],
): number => {
  if (groupsSizes.length === 0) {
    return graphSize;
  }

  const step = Math.round(graphSize / groupsSizes.length);
  const sizes = groupsSizes.filter((size) => size > step);

  if (sizes.length === 0) {
    return step;
  }

  const sumSizes = sum(sizes);
  const groupsCount = groupsSizes.length - sizes.length;
  const nextGraphSize = graphSize - sumSizes;

  if (groupsCount === 1) {
    return nextGraphSize;
  }

  return getGraphStepSize(
    nextGraphSize,
    groupsSizes.filter((size) => size <= step),
  );
};

type GetColumnSizeParams = {
  size: Size;
  valueLength: number;
  isHorizontal: boolean;
};

export const getColumnSize = (params: GetColumnSizeParams): ColumnSize => {
  const { size, valueLength, isHorizontal } = params;

  if (size !== 'auto') {
    return size;
  }

  if (size === 'auto' && isHorizontal) {
    return 'm';
  }

  switch (valueLength) {
    case 1:
      return 's';
    case 2:
      return 'm';
    case 3:
      return 'xl';
    case 4:
      return '2xl';
    default:
      return '3xl';
  }
};

export const defaultGetAxisShowPositions: GetAxisShowPositions = ({
  isHorizontal,
  showReversed,
}) => ({
  top: !isHorizontal && showReversed,
  right: isHorizontal && showReversed,
  bottom: true,
  left: true,
});

export const getScaler = (maxValue: number) => (value: number) => {
  const percent = (Math.abs(value) / maxValue) * 100;
  return percent > 100 ? 100 : percent;
};

const getAreaNames = (count: number, handler: (i: number) => string) =>
  [...Array(count).keys()].map(handler).join(' ');

const joinStrings = (
  arr: ReadonlyArray<string | boolean | undefined>,
): string => arr.filter(isTruthy).join(' ');

const joinAreasRow: typeof joinStrings = (arr) => `"${joinStrings(arr)}"`;

export const getGridSettings = (
  params: { countGroups: number } & (
    | { isHorizontal: true; axisShowPositions: ShowPositions }
    | { isHorizontal: false }
  ),
): React.CSSProperties => {
  const { countGroups } = params;

  if (params.isHorizontal) {
    const { axisShowPositions } = params;
    const withTopRow = axisShowPositions.top;
    const withBottomTicksRow = axisShowPositions.bottom;
    const withLeftColumn = axisShowPositions.left;
    const withRightColumn = axisShowPositions.right;

    return {
      gridTemplateRows: joinStrings([
        withTopRow && 'auto',
        getAreaNames(countGroups, () => '1fr'),
        withBottomTicksRow && 'auto',
        'auto',
      ]),
      gridTemplateColumns: joinStrings([
        withLeftColumn && 'fit-content(25%)',
        '1fr',
        withRightColumn && 'fit-content(25%)',
      ]),
      gridTemplateAreas: joinStrings([
        withTopRow &&
          joinAreasRow([
            withLeftColumn && 'topLeft',
            'topTicks',
            withRightColumn && 'topRight',
          ]),
        getAreaNames(countGroups, (index) =>
          joinAreasRow([
            withLeftColumn && `labelLeft${index}`,
            `group${index}`,
            withRightColumn && `labelRight${index}`,
          ]),
        ),
        withBottomTicksRow &&
          joinAreasRow([
            withLeftColumn && 'bottomLeft',
            'bottomTicks',
            withRightColumn && 'bottomRight',
          ]),
        joinAreasRow([
          withLeftColumn && 'bottomLeft',
          'bottomUnit',
          withRightColumn && 'bottomUnit',
        ]),
      ]),
    };
  }

  return {
    gridTemplateRows: joinStrings(['fit-content(20%)', '1fr', 'auto', 'auto']),
    gridTemplateColumns: `fit-content(20%) ${getAreaNames(
      countGroups,
      () => '1fr',
    )}`,
    gridTemplateAreas: joinStrings([
      `"topLeft ${getAreaNames(countGroups, (index) => `labelTop${index}`)}"`,
      `"leftTicks ${getAreaNames(countGroups, (index) => `group${index}`)}"`,
      `"bottomLeft ${getAreaNames(
        countGroups,
        (index) => `labelBottom${index}`,
      )}"`,
      `"bottomLeft ${getAreaNames(countGroups, () => 'bottomUnit')}"`,
    ]),
  };
};

export const getLabelGridAreaName = (position: Position) => (index: number) => {
  return `label${position[0].toUpperCase()}${position.substring(1)}${index}`;
};

export const isShowReversed = ({
  groups,
  threshold,
}: {
  groups: readonly GroupItem[];
  threshold?: Threshold;
}) => {
  return (
    Boolean(threshold && threshold.value < 0) ||
    groups.some((group) =>
      group.reversedColumns.some((column) => column && column.sections),
    )
  );
};

export const isMultiColumn = (groups: readonly GroupItem[]) => {
  return groups.some(
    (group) => group.columns.length > 1 || group.reversedColumns.length > 1,
  );
};

export const getCommonGroupsMaxColumns = (groups: readonly GroupItem[]) => {
  if (!groups.length) {
    return 0;
  }

  return Math.max(
    ...groups.map((group) =>
      Math.max(group.columns.length, group.reversedColumns.length),
    ),
  );
};

export const GRID_GAP_SPACE = {
  '2xs': 'var(--space-2xs)',
  'xs': 'var(--space-xs)',
  'm': 'var(--space-m)',
  's': 'var(--space-s)',
};

export const getGridRowGap = (
  axisSize: Size,
  isHorizontal?: boolean,
): string => {
  if (isHorizontal && axisSize === 's') {
    return GRID_GAP_SPACE.xs;
  }

  if (isHorizontal && axisSize === 'm') {
    return GRID_GAP_SPACE.m;
  }

  if (axisSize === 's') {
    return GRID_GAP_SPACE['2xs'];
  }

  return GRID_GAP_SPACE.xs;
};

export const getGridColumnGap = (axisSize: Size): string => {
  if (axisSize === 's') {
    return GRID_GAP_SPACE.xs;
  }

  return GRID_GAP_SPACE.m;
};

export const getColumnLength = (
  columnLength: number,
  gridItem: number,
  typeColumn: TypeColumn,
) => {
  switch (typeColumn) {
    case 'columns':
      return columnLength >= gridItem ? gridItem : columnLength;
    case 'reversedColumns':
      return columnLength >= gridItem ? columnLength : gridItem;
    default:
      throw new Error(`Неизвестный тип typeColumn: ${typeColumn}`);
  }
};

export const getPaddingThreshold = (
  isHorizontal: boolean,
  threshold?: Threshold,
) => {
  if (threshold?.value && !isHorizontal) {
    return 'right';
  }
  if (threshold?.value && isHorizontal) {
    return 'top';
  }
  return '';
};

export const useGridStyle = ({
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  ref,
  isHorizontal,
  width,
  height,
  groupsRef,
}: {
  paddingRight: number;
  paddingLeft: number;
  paddingTop: number;
  paddingBottom: number;
  ref: React.RefObject<HTMLDivElement>;
  isHorizontal: boolean;
  width: number;
  height: number;
  groupsRef: React.MutableRefObject<Array<React.RefObject<HTMLDivElement>>>;
}) => {
  const [gridStyle, changeGridStyle] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const firstGroup = groupsRef.current[0].current;
  // Если группа всего одна, то считаем её как первую и как последнюю
  const lastGroup = groupsRef.current[1].current || firstGroup;

  let left = 0;
  let top = 0;
  let newHeight = 0;
  let newWidth = 0;

  if (ref && ref.current && firstGroup && lastGroup) {
    left =
      firstGroup.getBoundingClientRect().left -
      ref.current.getBoundingClientRect().left;
    top =
      firstGroup.getBoundingClientRect().top -
      ref.current.getBoundingClientRect().top;
    newHeight =
      lastGroup.getBoundingClientRect().bottom -
      firstGroup.getBoundingClientRect().top;
    newWidth =
      lastGroup.getBoundingClientRect().right -
      firstGroup.getBoundingClientRect().left;
  }

  useLayoutEffect(() => {
    changeGridStyle({
      left: left + paddingLeft,
      top: top + paddingTop,
      height: newHeight - paddingTop - paddingBottom,
      width: newWidth - paddingLeft - paddingRight,
    });
  }, [
    newWidth,
    newHeight,
    left,
    top,
    isHorizontal,
    width,
    height,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  ]);

  return gridStyle;
};

export const isInDomain = (value: number, domain: NumberRange) => {
  const minInDomain = Math.min(...domain);
  const maxInDomain = Math.max(...domain);

  return value >= minInDomain && value <= maxInDomain;
};
