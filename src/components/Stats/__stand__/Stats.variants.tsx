import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

import { numberFormatter } from '##/utils/formatters';

import { Stats } from '..';
import { iconsArrowRate, layouts, sizes, statuses } from '../helpers';

const Variants = () => {
  const value = useNumber('value', 2170);
  const placeholder = useText('placeholder', '—');
  const title = useText('title', 'Молний за год');
  const iconTitle = useBoolean('iconTitle', false)
    ? IconLightningBolt
    : undefined;
  const unit = useText('unit', 'разрядов');
  const rate = useText('rate', '20%');
  const iconArrowRate = useSelect('iconArrowRate', iconsArrowRate, 'up');
  const status = useSelect('status', statuses, statuses[0]);
  const layout = useSelect('layout', layouts, layouts[0]);
  const size = useSelect('size', sizes, sizes[3]);
  const formatValue = useBoolean('formatValue', true)
    ? numberFormatter
    : String;
  const formatRate = useBoolean('formatRate', true) ? numberFormatter : String;

  return (
    <Stats
      value={value as number}
      placeholder={placeholder}
      title={title}
      rate={rate}
      iconTitle={iconTitle}
      iconArrowRate={iconArrowRate}
      unit={unit}
      status={status}
      layout={layout}
      size={size}
      formatValue={formatValue}
      formatRate={formatRate}
    />
  );
};

export default Variants;
