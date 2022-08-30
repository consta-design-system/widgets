import { IconWarning } from '@consta/uikit/IconWarning';
import React from 'react';

import { Legend } from '##/components/Legend';
import { Example } from '##/stand/components/Example';

export const LegendExampleType = () => (
  <Example>
    <Legend
      direction="column"
      icon="dot"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер dot',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon="gap"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер gap',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon="line"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер line',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon="lineBold"
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер lineBold',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon={() => <IconWarning view="warning" size="s" />}
      items={[
        {
          color: 'var(--color-bg-normal)',
          text: 'Маркер <IconWarning />',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
  </Example>
);

export const LegendExampleTypeLine = () => (
  <Example>
    <Legend
      direction="column"
      icon="line"
      items={[
        {
          color: 'var(--color-bg-success)',
          text: 'Маркер line',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon="lineBold"
      items={[
        {
          color: 'var(--color-bg-success',
          text: 'Маркер с lineBold',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
    <Legend
      direction="column"
      icon="line"
      items={[
        {
          color: 'var(--color-bg-success)',
          text: 'Маркер в позиции top',
        },
      ]}
      size="s"
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.text}
    />
  </Example>
);
