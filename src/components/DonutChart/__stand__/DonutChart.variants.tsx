import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import {
  ArcDataItem,
  arcLabelSizes,
  defaultFormatArcLabel,
  defaultSortValue,
  halvesDonut,
} from '##/components/CoreDonutChart/helpers';

import { DonutChart } from '..';
import { donutData } from '../__mocks__/data.mock';
import { legendPositions } from '../helpers';

const Variants = () => {
  const value = useText('value', '');
  const label = useText('label', 'км');
  const halfDonut = useSelect('halfDonut', halvesDonut, 'top');
  const legendPosition = useSelect('legendPosition', legendPositions, 'right');
  const showArcLabels = useBoolean('showArcLabels', false);
  const arcLabelSize = useSelect('arcLabelSizes', arcLabelSizes, 's');
  const formatValueForTooltip = useBoolean('formatValueForTooltip', true)
    ? (v: number) => {
        return `${v} тыс м3`;
      }
    : String;

  const formatArcLabel = useBoolean('formatArcLabel', true)
    ? defaultFormatArcLabel
    : (item: ArcDataItem) => String(item.value);
  const sortValue = useBoolean('sortValue', true) ? defaultSortValue : null;

  return (
    <DonutChart
      data={donutData.data}
      halfDonut={halfDonut}
      sums={[]}
      legendPosition={legendPosition}
      showArcLabels={showArcLabels}
      arcLabelSize={arcLabelSize}
      label={label}
      formatValueForTooltip={formatValueForTooltip}
      formatArcLabel={formatArcLabel}
      sortValue={sortValue}
      value={value}
    />
  );
};

export default Variants;
