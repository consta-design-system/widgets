import './HoverLines.css';

import React from 'react';

import { flatten, uniqBy } from '##/utils/array';
import { cn } from '##/utils/bem';
import { isDefined, isNotNil } from '##/utils/type-guards';

import { HoveredMainValue, Line, ScaleLinear } from '../LinearChart';

const cnHoverLines = cn('HoverLines');

export type Handler = (newValue: HoveredMainValue) => void;

type Props = {
  lines: readonly Line[];
  height: number;
  scaleX: ScaleLinear;
  hoveredMainValue: HoveredMainValue;
  onChangeHoveredMainValue: Handler;
  onClickLine?: (value: number) => void;
};

type LineProps = {
  position: Position;
  className: string;
  value?: number;
  onHover: Handler;
  onClick?: () => void;
};

type Position = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const HoverLine: React.FC<LineProps> = ({
  position,
  className,
  value,
  onHover,
  onClick,
}) => {
  const { x1, y1, x2, y2 } = position;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={className}
      onMouseLeave={() => onHover(undefined)}
      onMouseEnter={() => onHover(value)}
      onClick={onClick}
    />
  );
};

export const HoverLines: React.FC<Props> = ({
  scaleX,
  lines,
  height,
  hoveredMainValue,
  onChangeHoveredMainValue,
  onClickLine,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineValues = uniqBy(
    flatten(lines.map((l) => l.values)),
    (v: any) => v.x,
  );

  return (
    <g>
      {lineValues
        .map((lineValue, index) => {
          const mainValue = lineValue.x;

          if (!isNotNil(mainValue)) {
            return;
          }

          const position = {
            x1: scaleX(mainValue),
            y1: 0,
            x2: scaleX(mainValue),
            y2: height,
          };
          const isActive = mainValue === hoveredMainValue;
          const commonProps = {
            position,
            value: mainValue,
            onHover: onChangeHoveredMainValue,
            onClick: onClickLine ? () => onClickLine(mainValue) : undefined,
          };

          return (
            <React.Fragment key={index}>
              <HoverLine
                {...commonProps}
                className={cnHoverLines('Item', { isHoverable: true })}
              />
              <HoverLine
                {...commonProps}
                className={cnHoverLines('Item', { isActive })}
              />
            </React.Fragment>
          );
        })
        .filter(isDefined)}
    </g>
  );
};
