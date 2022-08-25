import React from 'react';

import { Example } from '##/storybook';

import { Legend } from '../../Legend';

export const LegendExampleSize = () => (
  <Example style={{ marginBottom: '20px' }}>
    <Legend
      size="xs"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись XS',
        },
      ]}
      icon="dot"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      size="s"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись S',
        },
      ]}
      icon="dot"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      size="m"
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Надпись M',
        },
      ]}
      icon="dot"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
  </Example>
);
