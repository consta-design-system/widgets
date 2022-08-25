import React from 'react';

import { Example } from '##/storybook';

import { Legend } from '../../Legend';

type Item = {
  color: string;
  text: string;
};

const items: readonly Item[] = [
  {
    color: 'var(--color-bg-alert)',
    text: 'Пункт раз',
  },
  {
    color: 'var(--color-bg-warning)',
    text: 'Пункт два',
  },
  {
    color: 'var(--color-bg-success)',
    text: 'Пункт три',
  },
];

export const LegendExampleDirectionRow = () => (
  <Example>
    <Legend
      direction="row"
      items={items}
      icon="dot"
      size="s"
      getItemLabel={(item) => item.text}
      getItemColor={(item) => item.color}
    />
  </Example>
);

export const LegendExampleDirectionColumn = () => (
  <Example>
    <Legend
      direction="column"
      items={items}
      icon="dot"
      size="s"
      getItemLabel={(item) => item.text}
      getItemColor={(item) => item.color}
    />
  </Example>
);
