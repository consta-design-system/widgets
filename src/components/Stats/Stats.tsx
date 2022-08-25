import './Stats.css';

import { Text } from '@consta/uikit/Text';
import React, { forwardRef, HTMLAttributes } from 'react';

import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';
import { numberFormatter } from '##/utils/formatters';
import { isNotNil } from '##/utils/type-guards';

import {
  FormatRate,
  IconArrowRate,
  IconTitle,
  iconTitleSizes,
  Layout,
  Size,
  Status,
  titleSizes,
} from './helpers';
import { StatsRate } from './StatsRate/StatsRate';
import { StatsTitle } from './StatsTitle/StatsTitle';

const cnStats = cn('Stats');

type Props = HTMLAttributes<HTMLDivElement> & {
  value: number | null;
  placeholder?: string;
  title?: string;
  iconTitle?: IconTitle;
  unit?: string;
  rate?: string;
  iconArrowRate?: IconArrowRate;
  status?: Status;
  layout?: Layout;
  size?: Size;
  formatValue?: FormatValue;
  formatRate?: FormatRate;
  children?: never;
};

export const Stats = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    value,
    placeholder = '—',
    title,
    iconTitle,
    rate,
    iconArrowRate,
    unit,
    layout = 'default',
    size = 'm',
    status = 'system',
    formatValue = numberFormatter,
    formatRate = numberFormatter,
    ...mainElementProps
  } = props;
  const isDefaultLayout = layout === 'default';
  const valueModificators = {
    status: rate ? undefined : status,
  };

  const renderedIconTitle = iconTitle
    ? React.createElement(iconTitle, { size: iconTitleSizes[size] })
    : null;
  const titleElement =
    title || renderedIconTitle ? (
      <StatsTitle size={size} icon={renderedIconTitle} title={title} />
    ) : null;

  const rateElement = rate ? (
    <StatsRate
      className={cnStats('Rate', { status })}
      rate={formatRate(rate)}
      icon={iconArrowRate}
    />
  ) : null;

  const unitElement = unit ? (
    <Text
      className={cnStats('Unit')}
      as="div"
      size={titleSizes[size]}
      lineHeight="s"
      view="secondary"
    >
      {unit}
    </Text>
  ) : null;

  return (
    <div {...mainElementProps} ref={ref} className={cnStats({ layout, size })}>
      {titleElement}
      <div className={cnStats('Main')}>
        <Text
          className={cnStats('Value', valueModificators)}
          as="div"
          lineHeight="2xs"
          weight="bold"
        >
          {isNotNil(value) ? formatValue(value) : placeholder}
        </Text>
        {isDefaultLayout ? rateElement : unitElement}
      </div>
      {isDefaultLayout ? unitElement : rateElement}
    </div>
  );
});
