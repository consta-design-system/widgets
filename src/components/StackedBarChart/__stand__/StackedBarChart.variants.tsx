import { useBoolean, useText } from '@consta/stand';
import React from 'react';

import { withPercentColumnsData, withTwoColumnsData } from '../data.mock';
import { StackedBarChart } from '../StackedBarChart';

const Variants = () => {
  const isHorizontal = useBoolean('isHorizontal', false);
  const showGuide = useBoolean('showGuide', true);
  const showGroupsLabels = useBoolean('showGroupsLabels', true);
  const showGrid = useBoolean('showGrid', true);
  const unit = useText('unit', withTwoColumnsData.unit);

  return (
    <StackedBarChart
      unit={unit}
      showGuide={showGuide}
      isHorizontal={isHorizontal}
      showGrid={showGrid}
      showGroupsLabels={showGroupsLabels}
      groups={withPercentColumnsData.groups}
      formatValueForLabel={(v) => `${v}%`}
    />
  );
};

export default Variants;
