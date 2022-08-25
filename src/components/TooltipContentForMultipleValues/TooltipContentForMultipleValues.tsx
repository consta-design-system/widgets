import './TooltipContentForMultipleValues.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { LegendItem } from '##/components/LegendItem';
import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';
import { getFormattedValue } from '##/utils/chart';
import { formatForArray } from '##/utils/formatForArray';
import { numberFormatter } from '##/utils/formatters';
import { isNotNil } from '##/utils/type-guards';
import { isNumber } from '##/utils/util';

const cnTooltipContent = cn('TooltipContentForMultipleValues');

export type Item = {
  name?: string;
  value?: number | null;
  color?: string;
};

type Props = {
  title?: string;
  items: readonly Item[];
  formatValueForTooltip?: FormatValue;
};

export const TooltipContentForMultipleValues: React.FC<Props> = ({
  title,
  items,
  formatValueForTooltip,
}) => {
  const newItems = items.map((item) => item.value || 0);
  const formatItems = formatForArray(newItems);
  const withNoNames = items.every((item) => !item.name);
  const withNoColors = items.every((item) => !item.color);

  return (
    <div className={cnTooltipContent('Container')}>
      {title && (
        <Text
          as="div"
          size="xs"
          weight="bold"
          view="primary"
          className={cnTooltipContent('Title')}
        >
          {title}
        </Text>
      )}

      <div className={cnTooltipContent('Content')}>
        {items.map(({ name, color, value }, idx) => {
          const formattedValue = getFormattedValue(
            value ?? null,
            formatValueForTooltip,
          );
          const newFormattedValue = isNotNil(value)
            ? `${formatItems[idx]} ${formattedValue
                .split(' ')
                .slice(1)
                .join(' ')}`
            : formattedValue;

          return (
            <React.Fragment key={idx}>
              <LegendItem
                label={name || ''}
                icon={isNumber(value) ? 'dot' : undefined}
                color={color}
                size="xs"
                className={cnTooltipContent('LegendItem', {
                  isSingleColumn: !name && !value,
                  withPadding: !color && !withNoColors,
                  withNoNames,
                })}
              />
              {(name || value) && (
                <Text
                  className={cnTooltipContent('ItemValue')}
                  as="span"
                  size="xs"
                  weight={withNoNames ? 'regular' : 'bold'}
                  view="primary"
                >
                  {numberFormatter(newFormattedValue)}
                </Text>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
