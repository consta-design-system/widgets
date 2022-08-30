import React from 'react';

import { Stats } from '##/components/Stats';
import { exampleData } from '##/components/Stats/__mocks__/examples.mock';
import { Example } from '##/stand/components/Example';

export const StatsExampleRateUp = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="20%" iconArrowRate="up" />
  </Example>
);

export const StatsExampleRateDown = () => (
  <Example>
    <Stats
      {...exampleData}
      size="2xs"
      rate="20%"
      iconArrowRate="down"
      status="error"
    />
  </Example>
);

export const StatsExampleRateAutoPositive = () => (
  <Example>
    <Stats {...exampleData} size="2xs" rate="+20%" iconArrowRate="auto" />
  </Example>
);

export const StatsExampleRateAutoNegative = () => (
  <Example>
    <Stats
      {...exampleData}
      size="2xs"
      rate="-20%"
      status="error"
      iconArrowRate="auto"
    />
  </Example>
);
