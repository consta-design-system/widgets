import './CoreBarChartGroup.css';

import { useComponentSize } from '@consta/uikit/useComponentSize';
import React, { useEffect, useRef } from 'react';

import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';
import { NumberRange } from '##/utils/scale';

import { LabelSize } from '../CoreBarChart';
import {
  CoreBarChartColumn,
  SectionItem,
} from '../CoreBarChartColumn/CoreBarChartColumn';
import { TooltipData } from '../CoreBarChartTooltip/CoreBarChartTooltip';
import {
  getSections,
  getSizeGroupsLimit,
  scalerCommonColumnsGroups,
  styleOrientation,
} from './helpers';

const cnCoreBarChartGroup = cn('CoreBarChartGroup');

export type ColumnItem = {
  total: number;
  sections?: readonly SectionItem[];
};

export type GroupItem = {
  name: string;
  columns: ReadonlyArray<ColumnItem | undefined>;
  reversedColumns: ReadonlyArray<ColumnItem | undefined>;
  total?: number;
};

export type SizeGraphic = {
  width: number;
  height: number;
};

type Props = {
  item: GroupItem;
  isHorizontal: boolean;
  activeGroup?: string;
  activeSectionIndex?: number;
  showValues: boolean;
  scalerMaxValue: (value: number) => number;
  scalerMinValue: (value: number) => number;
  maxNumberGroups: number;
  columnLength: number;
  reversedColumnLength?: number;
  formatValueForLabel?: FormatValue;
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void;
  onMouseLeaveColumn: (groupName: string) => void;
  onMouseClickColumn?: (groupName: string) => void;
  onChangeLabelSize?: (size: LabelSize) => void;
  style?: React.CSSProperties;
  getNumberGridTicks: (length: number) => void;
  gridDomain: NumberRange;
  limitMinimumStepSize?: boolean;
};

export const CoreBarChartGroup: React.FC<Props> = (props) => {
  const {
    item: { name: group, columns, reversedColumns },
    isHorizontal,
    activeGroup,
    activeSectionIndex,
    showValues,
    scalerMaxValue,
    scalerMinValue,
    maxNumberGroups,
    columnLength,
    reversedColumnLength,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onMouseClickColumn,
    onChangeLabelSize,
    getNumberGridTicks,
    gridDomain,
    limitMinimumStepSize = false,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useComponentSize(ref);

  const scalerColumnsGroups = scalerCommonColumnsGroups(
    columnLength,
    gridDomain,
    reversedColumnLength,
  );

  useEffect(() => {
    if (isHorizontal && width) {
      getNumberGridTicks(width);
    } else {
      getNumberGridTicks(height);
    }
  }, [isHorizontal, width, height, getNumberGridTicks]);

  const renderColumn = (
    column: ColumnItem | undefined,
    index: number,
    isReversed?: boolean,
  ) => {
    if (!column) {
      return null;
    }

    const sections = getSections({
      sections: column.sections,
      scaler: column.total >= 0 ? scalerMaxValue : scalerMinValue,
    });

    const lengthColumns =
      !sections[0] || sections[0] === undefined ? 0 : sections[0].length;

    return (
      <CoreBarChartColumn
        key={index}
        group={group}
        total={column.total}
        sections={sections}
        lengthColumns={lengthColumns}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        clickable={!!onMouseClickColumn}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={(params) => onMouseEnterColumn(group, params)}
        onMouseLeaveColumn={() => onMouseLeaveColumn(group)}
        onMouseClickColumn={() => onMouseClickColumn?.(group)}
        onChangeLabelSize={onChangeLabelSize}
        maxNumberGroups={maxNumberGroups}
        gridDomain={gridDomain}
      />
    );
  };

  const sizeGroupsLimit = getSizeGroupsLimit(
    isHorizontal,
    limitMinimumStepSize,
  );

  return (
    <div
      className={cnCoreBarChartGroup('Groups', {
        isHorizontal,
        sizeGroupsLimit,
      })}
      ref={ref}
    >
      <div className={cnCoreBarChartGroup('Columns')}>
        <div
          className={cnCoreBarChartGroup('Wrapper')}
          style={styleOrientation(
            isHorizontal,
            scalerColumnsGroups,
            gridDomain,
            columnLength,
          )}
        >
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        <div
          className={cnCoreBarChartGroup('Wrapper')}
          style={styleOrientation(
            isHorizontal,
            scalerColumnsGroups,
            gridDomain,
            reversedColumnLength,
          )}
        >
          {reversedColumns.map((column, index) =>
            renderColumn(column, index, true),
          )}
        </div>
      </div>
    </div>
  );
};
