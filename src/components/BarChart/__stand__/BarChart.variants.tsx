import { useBoolean, useText } from '@consta/stand';
import React from 'react';

import { BarChart } from '##/components/BarChart';

import { minimalData } from '../data.mock';

const Variants = () => {
  const isXAxisLabelsSlanted = useBoolean('isXAxisLabelsSlanted', false);
  const isHorizontal = useBoolean('isHorizontal', false);
  const showValues = useBoolean('showValues', true);
  const showGuide = useBoolean('showGuide', true);
  const showGroupsLabels = useBoolean('showGroupsLabels', true);
  const showGrid = useBoolean('showGrid', true);
  const unit = useText('unit', minimalData.unit);

  return (
    <BarChart
      colors={minimalData.colors}
      groups={minimalData.groups}
      threshold={minimalData.threshold}
      isHorizontal={isHorizontal}
      unit={unit}
      showGuide={showGuide}
      showGrid={showGrid}
      showGroupsLabels={showGroupsLabels}
      showValues={showValues}
      isXAxisLabelsSlanted={isXAxisLabelsSlanted}
    />
  );
};

export default Variants;
