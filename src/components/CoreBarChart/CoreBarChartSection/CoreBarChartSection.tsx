import './CoreBarChartSection.css';

import { Text } from '@consta/uikit/Text';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';
import { formatForValue } from '##/utils/formatForValue';
import { NumberRange } from '##/utils/scale';

import { LabelSize } from '../CoreBarChart';
import { ColumnProperty } from '../CoreBarChartColumn/CoreBarChartColumn';
import {
  getBackground,
  getColor,
  getDirection,
  getRoundedBorder,
  getTriangle,
} from './helpers';

const cnCoreBarChartSection = cn('CoreBarChartSection');

type Props = {
  color: string;
  length: number;
  isHorizontal: boolean;
  isReversed: boolean;
  isActive: boolean;
  overflowed?: boolean;
  label?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseClick?: React.MouseEventHandler;
  onChangeLabelSize?: (size: LabelSize) => void;
  columnProperty: ColumnProperty;
  gridDomain: NumberRange;
  numberColumnSections: number;
  indexSection?: number;
};

export const CoreBarChartSection = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      color,
      length,
      isHorizontal,
      isReversed,
      isActive,
      overflowed,
      label,
      onMouseEnter,
      onMouseLeave,
      onMouseClick,
      onChangeLabelSize,
      columnProperty,
      gridDomain,
      numberColumnSections,
      indexSection,
    },
    ref,
  ) => {
    const labelRef = React.useRef<HTMLDivElement>(null);
    const [labelWidth, setLabelWidth] = useState<number | null>(null);

    const isOverflow =
      (!isReversed && gridDomain[1] < Number(label)) ||
      (isReversed && gridDomain[0] > Number(label));

    React.useEffect(() => {
      if (!label || !labelRef.current) {
        return;
      }

      const { width, height } = labelRef.current.getBoundingClientRect();

      setLabelWidth(width);

      onChangeLabelSize &&
        onChangeLabelSize({
          width: Math.round(width),
          height: Math.round(height),
        });
    }, [label, labelRef, onChangeLabelSize]);

    const direction = getDirection(isHorizontal, isReversed);
    const horizontal = !isHorizontal ? 'vertical' : '';
    const lastSection =
      (!!indexSection && numberColumnSections === indexSection + 1) ||
      numberColumnSections === 1;
    const columnOverflow =
      isOverflow && numberColumnSections === 1
        ? getDirection(isHorizontal, isReversed)
        : '';
    const formatLabel = label && formatForValue(label);
    const gradientLength =
      ((16 / (isHorizontal ? columnProperty.width : columnProperty.height)) *
        100 *
        100) /
      length;
    const isSectionOverflow = isOverflow && overflowed;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        ref={ref}
        className={cnCoreBarChartSection('Sections', {
          horizontal,
          direction,
          isActive,
          columnOverflow,
        })}
        style={{
          width: isHorizontal ? `${Math.abs(length)}%` : undefined,
          height: isHorizontal ? undefined : `${Math.abs(length)}%`,
          ...getBackground(
            color,
            length,
            direction,
            gradientLength,
            isSectionOverflow,
          ),
          ...getRoundedBorder(columnProperty, direction, lastSection),
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onMouseClick}
      >
        {isOverflow && lastSection && (
          <svg
            className={cnCoreBarChartSection('Overflow', {
              horizontal,
              direction,
            })}
            style={getTriangle(isOverflow, direction, labelWidth, lastSection)}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path d="M4 0.5L8 5H0L4 0.5Z" fill="var(--color-bg-soft)" />
          </svg>
        )}
        {label && lastSection && (
          <Text
            ref={labelRef}
            as="div"
            view="primary"
            className={cnCoreBarChartSection('Label')}
            size="xs"
            style={getColor(color, false)}
            lineHeight="m"
          >
            {formatLabel}
          </Text>
        )}
      </div>
    );
  },
);
