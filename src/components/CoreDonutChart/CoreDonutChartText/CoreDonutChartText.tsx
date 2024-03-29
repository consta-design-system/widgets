import './CoreDonutChartText.css';

import { Textfit } from '@evless/react-textfit';
import React, { forwardRef, HTMLAttributes } from 'react';

import { cn } from '##/utils/bem';

import { HalfDonut } from '../helpers';
import {
  getContainerPadding,
  getContentBorderRadius,
  getContentHeight,
  getContentPadding,
  getContentWidth,
  getDonutHalfDirection,
  getHeightPaddingRatio,
  getRegularOrDoubleNumberByCondition,
  getTextMaxSize,
  getWidthPaddingRatio,
  LABEL_MIN_SIZE,
  TEXT_MAX_HEIGHT_RATIO,
  VALUE_MIN_SIZE,
} from './helpers';

const cnCoreDonutChartText = cn('CoreDonutChartText');

type Props = HTMLAttributes<HTMLDivElement> & {
  radius: number;
  lineWidth: number;
  value?: string;
  label?: string;
  halfDonut?: HalfDonut;
};

export const CoreDonutChartText = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      value,
      label,
      radius,
      halfDonut,
      lineWidth,
      className,
      style,
      ...mainElementProps
    } = props;

    const halfDirection = getDonutHalfDirection(halfDonut);
    const widthPadding = getContentPadding({
      radius,
      lineWidth,
      ratio: getWidthPaddingRatio(halfDirection),
    });
    const heightPadding = getContentPadding({
      radius,
      lineWidth,
      ratio: getHeightPaddingRatio(halfDirection),
    });
    const textPadding = getRegularOrDoubleNumberByCondition({
      value: heightPadding,
      condition: halfDirection === 'horizontal',
    });
    const maxWidth = getContentWidth({ radius, halfDirection });
    const maxHeight = getContentHeight({ radius, halfDirection });
    const valueMaxSize = getTextMaxSize({
      padding: textPadding,
      height: maxHeight,
      ratio: label ? TEXT_MAX_HEIGHT_RATIO : 1,
    });
    const labelMaxSize = getTextMaxSize({
      padding: value ? 0 : textPadding,
      height: value ? valueMaxSize : maxHeight,
      ratio: value ? TEXT_MAX_HEIGHT_RATIO : 1,
    });
    const contentStyle: React.CSSProperties = {
      ...style,
      maxWidth,
      maxHeight,
      padding: getContainerPadding({
        widthPadding,
        heightPadding,
        half: halfDonut,
      }),
      borderRadius: getContentBorderRadius(radius, halfDonut),
    };

    return (
      <div
        {...mainElementProps}
        ref={ref}
        className={cnCoreDonutChartText({ half: halfDonut ?? 'none' }, [
          className,
        ])}
        style={contentStyle}
      >
        {valueMaxSize > 0 && (
          <Textfit
            className={cnCoreDonutChartText('Value', {
              half: halfDonut ?? 'none',
            })}
            min={VALUE_MIN_SIZE}
            max={valueMaxSize}
            mode="single"
          >
            {value}
          </Textfit>
        )}
        {labelMaxSize > 0 && (
          <Textfit
            className={cnCoreDonutChartText('Label', {
              half: halfDonut ?? 'none',
            })}
            min={LABEL_MIN_SIZE}
            max={labelMaxSize}
            mode="single"
          >
            {label}
          </Textfit>
        )}
      </div>
    );
  },
);
