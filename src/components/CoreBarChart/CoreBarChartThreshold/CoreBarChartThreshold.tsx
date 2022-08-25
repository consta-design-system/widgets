import './CoreBarChartThreshold.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { formatForValue } from '##/utils/formatForValue';
import { Scaler } from '##/utils/scale';

const cnCoreBarChartThreshold = cn('CoreBarChartThreshold');

type Props = {
  valuesScale: Scaler<number>;
  isHorizontal: boolean;
  value: number;
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

const getPositionText = (value: number, isHorizontal: boolean) => {
  if (isHorizontal) {
    return {
      x: value,
      y: '0',
      dy: '-8px',
    };
  }

  return {
    x: '100%',
    y: value,
    dx: '8px',
  };
};

export const CoreBarChartThreshold: React.FC<Props> = ({
  valuesScale,
  isHorizontal,
  value,
}) => {
  const scaledValue = valuesScale.scale(value);
  const linePos = getLinePosition(scaledValue, isHorizontal);
  const textPos = getPositionText(scaledValue, isHorizontal);
  const horizontal = !isHorizontal ? 'vertical' : '';

  const textValue = formatForValue(String(value));

  return (
    <>
      <line
        stroke="var(--color-bg-warning)"
        className={cnCoreBarChartThreshold('Main')}
        {...linePos}
      />
      <text
        {...textPos}
        className={cnCoreBarChartThreshold('Text', { horizontal })}
      >
        {textValue}
      </text>
    </>
  );
};
