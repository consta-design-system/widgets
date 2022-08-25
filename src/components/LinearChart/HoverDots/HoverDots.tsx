import './HoverDots.css';

import React from 'react';

import { flatten } from '##/utils/array';
import { cn } from '##/utils/bem';
import { isDefined, isNotNil } from '##/utils/type-guards';

import {
  HoveredDotValue,
  Line,
  NotEmptyItem,
  ScaleLinear,
} from '../LinearChart';

const cnHoverDots = cn('HoverDots');

export type Handler = (newValue: HoveredDotValue) => void;

type Props = {
  lines: readonly Line[];
  scaleX: ScaleLinear;
  scaleY: ScaleLinear;
  dotsClipPath: string;
  defaultDotRadius: number;
  onChangeHoveredDotValue: Handler;
  onClickDot?: (value: NotEmptyItem) => void;
};

type Position = {
  x: number;
  y: number;
};

type DotProps = {
  position: Position;
  radius: number;
  className: string;
  value?: NotEmptyItem;
  onHover: Handler;
  onClick?: () => void;
};

const HoverDot: React.FC<DotProps> = ({
  position,
  radius,
  className,
  value,
  onHover,
  onClick,
}) => {
  const { x, y } = position;

  return (
    <circle
      cx={x}
      cy={y}
      r={radius}
      className={className}
      onMouseLeave={() => onHover(undefined)}
      onMouseEnter={() => onHover(value)}
      onClick={onClick}
    />
  );
};

export const HoverDots: React.FC<Props> = ({
  lines,
  scaleX,
  scaleY,
  defaultDotRadius,
  onChangeHoveredDotValue,
  onClickDot,
}) => {
  const lineValues = flatten(lines.map((l) => l.values));

  return (
    <g>
      {lineValues
        .map((lineValue, index) => {
          if (!isNotNil(lineValue.x)) {
            return;
          }

          const value = {
            x: lineValue.x,
            y: lineValue.y,
          };
          const position = {
            x: scaleX(value.x),
            y: scaleY(value.y as number),
          };
          const commonProps = {
            position,
            radius: defaultDotRadius,
            value: value as NotEmptyItem,
            onHover: onChangeHoveredDotValue,
            onClick: onClickDot
              ? () => onClickDot(value as NotEmptyItem)
              : undefined,
          };

          return (
            <React.Fragment key={index}>
              <HoverDot
                {...commonProps}
                className={cnHoverDots('Item', { isHoverable: true })}
              />
            </React.Fragment>
          );
        })
        .filter(isDefined)}
    </g>
  );
};
