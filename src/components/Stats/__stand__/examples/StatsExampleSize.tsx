import { IconLightningBolt } from '@consta/uikit/IconLightningBolt';
import React from 'react';

import { Stats } from '##/components/Stats';
import { exampleData } from '##/components/Stats/__mocks__/examples.mock';
import { Example } from '##/stand/components/Example';

export const StatsExampleSize2XS = () => (
  <Example>
    <Stats {...exampleData} iconTitle={IconLightningBolt} size="2xs" />
  </Example>
);

export const StatsExampleSizeXS = () => (
  <Example>
    <Stats {...exampleData} iconTitle={IconLightningBolt} size="xs" />
  </Example>
);

export const StatsExampleSizeS = () => (
  <Example>
    <Stats {...exampleData} iconTitle={IconLightningBolt} size="s" />
  </Example>
);

export const StatsExampleSizeM = () => (
  <Example>
    <Stats {...exampleData} iconTitle={IconLightningBolt} size="m" />
  </Example>
);

export const StatsExampleSizeL = () => (
  <Example>
    <Stats {...exampleData} iconTitle={IconLightningBolt} size="l" />
  </Example>
);
