import * as d3 from 'd3';
import React from 'react';
import { useUID } from 'react-uid';

import { DirectionX, DirectionY } from '##/components/LinearChart/LinearChart';

import { NotEmptyItem, ScaleLinear } from '../LinearChart';

type AreaSign = 'positive' | 'negative' | 'default';
type Props = {
  values: readonly NotEmptyItem[];
  color: string;
  scaleX: ScaleLinear;
  scaleY: ScaleLinear;
  areaBottom: number;
  directionX?: DirectionX;
  directionY: DirectionY;
};

const getGradientDirection = ({
  directionX,
  directionY,
}: {
  directionX: DirectionX | undefined;
  directionY: DirectionY;
}) => {
  if (directionY === 'toBottom') {
    return {
      x1: '0%',
      y1: '100%',
      x2: '0%',
      y2: '0%',
    };
  }

  if (directionY === 'toTop') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '100%',
    };
  }

  if (directionX && directionX === 'toLeft') {
    return {
      x1: '0%',
      y1: '0%',
      x2: '100%',
      y2: '0%',
    };
  }

  if (directionX && directionX === 'toRight') {
    return {
      x1: '100%',
      y1: '0%',
      x2: '0%',
      y2: '0%',
    };
  }
};

export const Area: React.FC<Props> = ({
  values,
  color,
  scaleX,
  scaleY,
  areaBottom,
  directionX,
  directionY,
}) => {
  const uid = useUID();
  const linearGradientId = `line_area_${uid}`;
  const flattenValues = values.map((v) => v.y);
  const getAreaSign = (): AreaSign => {
    if (flattenValues.every((v) => v >= 0)) {
      return 'positive';
    }
    if (flattenValues.every((v) => v <= 0)) {
      return 'negative';
    }
    return 'default';
  };
  const maxValue = Math.max(...flattenValues);
  const minValue = Math.min(...flattenValues);
  const areaSign = getAreaSign();
  const percentOffset =
    areaSign === 'default'
      ? 100 - 100 / Math.abs((maxValue - minValue) / minValue)
      : undefined;
  const area = d3
    .area<NotEmptyItem>()
    .x(({ x }) => scaleX(x))
    .y1(({ y }) => scaleY(y))
    .y0(scaleY(areaSign !== 'negative' ? areaBottom : maxValue));

  const renderGradient = () => {
    return (
      <linearGradient
        id={linearGradientId}
        {...getGradientDirection({ directionX, directionY })}
      >
        <stop
          offset="0%"
          stopColor={color}
          stopOpacity={areaSign === 'negative' ? '0' : '0.4'}
        />
        {areaSign === 'default' && (
          <stop
            offset={`${percentOffset}%`}
            stopColor={color}
            stopOpacity="0"
          />
        )}
        <stop
          offset="100%"
          stopColor={color}
          stopOpacity={areaSign === 'positive' ? '0' : '0.4'}
        />
      </linearGradient>
    );
  };

  return (
    <>
      {renderGradient()}
      <path
        d={area([...values]) || undefined}
        style={{
          fill: `url(#${linearGradientId})`,
        }}
      />
    </>
  );
};
