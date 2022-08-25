import './DonutChart.css';

import React, { forwardRef, HTMLAttributes, MouseEventHandler } from 'react';

import { CoreDonutChart } from '##/components/CoreDonutChart';
import {
  HandlerClickArc,
  HandlerClickPie,
} from '##/components/CoreDonutChart/CoreDonutChartPie/CoreDonutChartPie';
import {
  ArcDataItem,
  ArcLabelSize,
  DonutDataItem,
  HalfDonut,
  SortValue,
} from '##/components/CoreDonutChart/helpers';
import { Legend } from '##/components/Legend/Legend';
import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';

import {
  filterComputedData,
  getComputedData,
  getLimitSizeSide,
  LegendPosition,
} from './helpers';

const cnDonutChart = cn('DonutChart');

type Props = HTMLAttributes<HTMLDivElement> & {
  data: readonly DonutDataItem[];
  value?: string;
  label?: string;
  halfDonut?: HalfDonut;
  valueSize?: number;
  sums?: readonly number[];
  legendPosition?: LegendPosition;
  showArcLabels?: boolean;
  arcLabelSize?: ArcLabelSize;
  formatValue?: (value: string) => string;
  formatLabel?: (label: string) => string;
  formatValueForTooltip?: FormatValue;
  formatArcLabel?: (item: ArcDataItem) => string;
  sortValue?: SortValue | null;
  onClick?: MouseEventHandler;
  onClickPie?: HandlerClickPie;
  onClickArc?: HandlerClickArc;
};

export const DonutChart = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { data, halfDonut, legendPosition, sums, ...rest } = props;

  const legendItems = data.map((item) => ({
    text: item.name,
    color: item.color,
  }));

  return (
    <div ref={ref} className={cnDonutChart({ legendPosition })}>
      {legendPosition && (
        <div className={cnDonutChart('Legend')}>
          <Legend
            items={legendItems}
            direction={
              legendPosition === 'right' || legendPosition === 'left'
                ? 'column'
                : 'row'
            }
            size="m"
            icon="dot"
            getItemColor={(item) => item.color}
            getItemLabel={(item) => item.text}
          />
        </div>
      )}
      <CoreDonutChart
        {...rest}
        limitSizeSide={getLimitSizeSide(legendPosition, halfDonut)}
        data={getComputedData(data, sums)}
        halfDonut={halfDonut}
        filterTooltipItem={filterComputedData}
        showTooltip
      />
    </div>
  );
});
