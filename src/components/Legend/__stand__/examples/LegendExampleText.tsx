import React from 'react';

import { Legend } from '##/components/Legend';
import { Example } from '##/stand/components/Example';

export const LegendExampleText = () => (
  <Example style={{ marginBottom: '20px' }}>
    <Legend
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Эта линия красивая красная',
        },
        {
          color: 'var(--color-bg-normal)',
          text: 'Эта линия красивая синяя',
        },
        {
          color: 'var(--color-bg-warning)',
          text: 'Эта линия — вообще супер, и, кстати, она желтая',
        },
        {
          color: 'var(--color-bg-success)',
          text: 'Эта линия зеленая',
        },
      ]}
      icon="dot"
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
  </Example>
);
