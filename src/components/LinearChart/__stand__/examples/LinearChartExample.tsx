import React from 'react';

import { LinearChart } from '##/components/LinearChart';
import { Example } from '##/stand/components/Example';

const colors = {
  first: 'var(--color-bg-success)',
  second: 'var(--color-bg-normal)',
};

const lines = [
  {
    values: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
      { x: 5, y: 3 },
    ],
    dots: false,
    lineName: 'Линия жизни',
    withGradient: false,
    color: colors.first,
  },
  {
    values: [
      { x: 0, y: 2 },
      { x: 1, y: 4 },
      { x: 3, y: 5 },
    ],
    dots: false,
    lineName: 'Линия любви',
    withGradient: false,
    color: colors.second,
  },
];

const linesBig = [
  {
    values: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 5, y: 3 },
      { x: 7, y: 1 },
      { x: 9, y: 3 },
    ],
    dots: true,
    dashed: true,
    showValues: true,
    lineName: 'Красивая линия',
    withGradient: true,
    color: 'var(--color-bg-normal)',
  },
];

const linesNu = [
  {
    values: [
      { x: 0, y: null },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 3, y: null },
      { x: 4, y: null },
      { x: 5, y: 3 },
      { x: 6, y: null },
      { x: 7, y: 1 },
      { x: 8, y: 2 },
      { x: 9, y: null },
    ],
    dots: true,
    showValues: true,
    lineName: 'Красивая линия',
    withGradient: true,
    color: 'var(--color-bg-normal)',
  },
];

const gridConfig = {
  x: {
    min: -1,
    max: 6,
    showGuide: true,
    withPaddings: false,
  },
  y: {
    min: -1,
    max: 6,
    showGuide: true,
    withPaddings: false,
  },
};

export const LinearChartExampleunit = () => (
  <Example width="300px" height="150px">
    <LinearChart lines={lines} gridConfig={gridConfig} unit="единицы" />
  </Example>
);

export const LinearChartExampleLines = () => (
  <Example width="300px" height="150px">
    <LinearChart lines={linesBig} gridConfig={gridConfig} />
  </Example>
);

export const LinearChartExampleLinesNull = () => (
  <Example width="300px" height="150px">
    <LinearChart lines={linesNu} gridConfig={gridConfig} />
  </Example>
);

export const LinearChartExamplePercentY = () => (
  <Example width="300px" height="150px">
    <LinearChart lines={lines} gridConfig={gridConfig} yLabelsShowInPercent />
  </Example>
);
