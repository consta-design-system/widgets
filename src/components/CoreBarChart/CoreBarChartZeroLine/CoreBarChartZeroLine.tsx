import './CoreBarChartZeroLine.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { Scaler } from '##/utils/scale';

const cnCoreBarChartZeroLine = cn('CoreBarChartZeroLine');

type Props = {
  valuesScale: Scaler<number>;
  isHorizontal: boolean;
};

const getLinePosition = (value: number, isHorizontal: boolean) => {
  if (isHorizontal) {
    return {
      x1: value,
      x2: value,
      y1: '0%',
      y2: '100%',
    };
  }

  return {
    x1: '0%',
    x2: '100%',
    y1: value,
    y2: value,
  };
};

export const CoreBarChartZeroLine: React.FC<Props> = ({
  valuesScale,
  isHorizontal,
}) => {
  const scaledValue = valuesScale.scale(0);
  const linePos = getLinePosition(scaledValue, isHorizontal);

  return (
    <svg className={cnCoreBarChartZeroLine('Main')}>
      <line className={cnCoreBarChartZeroLine('Line')} {...linePos} />
    </svg>
  );
};
