import './Grid.css';

import React from 'react';

import { cn } from '##/utils/bem';
import { Scaler } from '##/utils/scale';

const cnGrid = cn('Grid');

type Props = {
  scalerX: Scaler<number>;
  scalerY: Scaler<number>;
  xTickValues: readonly number[];
  yTickValues: readonly number[];
  width: number;
  height: number;
  xGridGuide?: number;
  yGridGuide?: number;
  showGuide?: boolean;
};

export const Grid: React.FC<Props> = ({
  scalerX,
  scalerY,
  xTickValues,
  yTickValues,
  width,
  height,
  xGridGuide,
  yGridGuide,
  showGuide,
}) => {
  return (
    <g className={cnGrid('Main')}>
      {xTickValues.map((tick) => {
        const x = scalerX.scale(tick);
        const isGuide = xGridGuide && tick === xGridGuide;
        if (tick === 0 && showGuide) {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={0}
              x2={0}
              y1={0}
              y2={0}
            />
          );
        }
        return (
          <line
            key={tick}
            className={cnGrid('Line', { guide: isGuide })}
            x1={x}
            x2={x}
            y1={0}
            y2={height}
          />
        );
      })}
      {yTickValues.map((tick) => {
        const y = scalerY.scale(tick);
        const isGuide = yGridGuide && tick === yGridGuide;
        if (tick === 0 && showGuide) {
          return (
            <line
              key={tick}
              className={cnGrid('Line', { guide: isGuide })}
              x1={0}
              x2={0}
              y1={0}
              y2={0}
            />
          );
        }
        return (
          <line
            key={tick}
            className={cnGrid('Line', { guide: isGuide })}
            x1={0}
            x2={width}
            y1={y}
            y2={y}
          />
        );
      })}
    </g>
  );
};
