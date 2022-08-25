import './StatsRate.css';

import { Text } from '@consta/uikit/Text';
import React, { FC } from 'react';

import { cn } from '##/utils/bem';

import { IconArrowRate, isNegativeRate, replaceRateSign } from '../helpers';

const cnStatsRate = cn('StatsRate');

type Props = {
  rate: string;
  icon?: IconArrowRate;
  className?: string;
  children?: never;
};

export const StatsRate: FC<Props> = ({ rate, icon, className }) => {
  const computedRate = icon ? replaceRateSign(rate) : rate;
  const isNegative =
    icon === 'down' || (icon === 'auto' && isNegativeRate(rate));

  return (
    <Text className={cnStatsRate(null, [className])} as="div" lineHeight="2xs">
      {icon && <div className={cnStatsRate('Icon', { isNegative })} />}
      {computedRate}
    </Text>
  );
};
