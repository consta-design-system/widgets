import { useSelect } from '@consta/stand';
import React from 'react';

import { iconTypes, sizes } from '../../LegendItem';
import { LinearChart } from '../../LinearChart/LinearChart';
import { withChart } from '../data.mock';
import { directions, Legend } from '../Legend';

type LegendItem = {
  color: string;
  text: string;
};

const Variants = () => {
  const direction = useSelect('direction', directions, 'column');
  const icon = useSelect('type', iconTypes, iconTypes[0]);
  const size = useSelect('size', sizes, sizes[1]);
  const handleClick = ({ item }: { item: LegendItem }) =>
    alert(JSON.stringify(item));

  return (
    <>
      <div style={{ height: 200, marginBottom: 'var(--space-m)' }}>
        <LinearChart {...withChart.linearChartProps} />
      </div>
      <div style={{ display: 'inline-block' }}>
        <Legend
          direction={direction}
          icon={icon}
          size={size}
          items={withChart.data}
          onItemClick={handleClick}
          getItemLabel={(item) => item.text}
          getItemColor={(item) => item.color}
        />
      </div>
    </>
  );
};

export default Variants;
