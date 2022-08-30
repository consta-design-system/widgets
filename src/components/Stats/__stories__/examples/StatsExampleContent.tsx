import { IconLightningBolt } from '@consta/uikit/IconLightningBolt';
import React from 'react';

import { Example } from '##/stand/components/Example';

import { Stats } from '../..';
import { exampleData } from '../../__mocks__/examples.mock';

export const StatsExampleContent = () => (
  <Example width="200px">
    <Stats {...exampleData} />
  </Example>
);

export const StatsExampleContentLong = () => (
  <Example width="180px">
    <Stats
      {...exampleData}
      title="В этом году молнии били в землю с ужасающей скоростью"
      iconTitle={IconLightningBolt}
      unit="км/с"
    />
  </Example>
);

export const StatsExamplePlaceholder = () => (
  <Example width="180px">
    <Stats
      {...exampleData}
      value={null}
      title="В этом году я видел"
      rate=""
      unit="молний"
    />
  </Example>
);
