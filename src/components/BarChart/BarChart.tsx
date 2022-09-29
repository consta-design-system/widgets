import React from 'react';

import {
  CoreBarChart,
  Threshold,
} from '##/components/CoreBarChart/CoreBarChart';
import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '##/components/CoreBarChart/helpers';
import { defaultRenderGroup } from '##/components/CoreBarChart/renders';
import { FormatGroupName, FormatValue } from '##/types';

import {
  getColumnsLengthArray,
  getMaxNumberGroupsArray,
  getMaxOfArray,
  getMinOfArray,
  transformGroupsToCommonGroups,
} from './helpers';

export type Column = number | undefined;

export type Group = {
  groupName: string;
  values: readonly Column[];
};

type Props = {
  groups: readonly Group[];
  min?: number;
  max?: number;
  colors: readonly string[];
  gridConfig?: number;
  unit?: string;
  showValues?: boolean;
  isHorizontal?: boolean;
  isXAxisLabelsSlanted?: boolean;
  threshold?: Threshold;
  formatValueForLabel?: FormatValue;
  formatValueForTooltip?: FormatValue;
  formatGroupName?: FormatGroupName;
  isEmptyColumnsHidden?: boolean;
  showGrid?: boolean;
  showGuide?: boolean;
  showGroupsLabels?: boolean;
  limitMinimumStepSize?: boolean;
};

export const BarChart: React.FC<Props> = (props) => {
  const {
    groups,
    min,
    max,
    colors,
    threshold,
    showValues,
    formatGroupName,
    isEmptyColumnsHidden = false,
    ...rest
  } = props;

  const commonGroups = transformGroupsToCommonGroups(
    groups,
    colors,
    isEmptyColumnsHidden,
  );
  const showReversed = isShowReversed({
    groups: commonGroups,
    threshold: props.threshold,
  });
  const groupsDomain = getGroupsDomain(commonGroups);
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    min,
    max,
    threshold: props.threshold,
  });

  const columnsLengthArray = getColumnsLengthArray(commonGroups, 'columns');
  const reversedColumnsLengthArray = getColumnsLengthArray(
    commonGroups,
    'reversedColumns',
  );

  const maxColumnLength = getMaxOfArray(columnsLengthArray);
  const minReversedColumnLength = getMinOfArray(reversedColumnsLengthArray);

  const maxNumberGroupsArray = getMaxNumberGroupsArray(commonGroups);
  const maxNumberGroups = getMaxOfArray(maxNumberGroupsArray);

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      showValues={showValues}
      showReversed={showReversed}
      threshold={threshold}
      maxColumnLength={maxColumnLength}
      minReversedColumnLength={minReversedColumnLength}
      renderGroup={defaultRenderGroup}
      maxNumberGroups={maxNumberGroups}
      formatGroupName={formatGroupName}
    />
  );
};
