import './CoreBarChartTooltip.css';

import { Tooltip as BaseTooltip } from '@consta/uikit/Tooltip';
import * as React from 'react';

import {
  Item,
  TooltipContentForMultipleValues,
} from '##/components/TooltipContentForMultipleValues/TooltipContentForMultipleValues';
import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';
import { isNotNil } from '##/utils/type-guards';

export type TooltipData = {
  x: number;
  y: number;
  items: readonly Item[];
};

type Props = {
  data: TooltipData;
  isHorizontal: boolean;
  formatValue?: FormatValue;
};

const cnCoreBarChartTooltip = cn('CoreBarChartTooltip');

const itemHasValue = (
  item: Item,
): item is Item & { value: NonNullable<Item['value']> } => isNotNil(item.value);

export const CoreBarChartTooltip: React.FC<Props> = ({
  data,
  isHorizontal,
  formatValue = String,
}) => {
  return (
    <BaseTooltip
      size="s"
      position={{ x: data.x, y: data.y }}
      direction={isHorizontal ? 'upCenter' : 'rightCenter'}
      isInteractive={false}
      className={cnCoreBarChartTooltip()}
    >
      <TooltipContentForMultipleValues
        items={data.items.filter(itemHasValue)}
        formatValueForTooltip={formatValue}
      />
    </BaseTooltip>
  );
};
