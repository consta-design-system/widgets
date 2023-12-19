import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import React from 'react';

import { Stats } from '##/components/Stats';
import { exampleData } from '##/components/Stats/__mocks__/examples.mock';
import { Example } from '##/stand/components/Example';

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
