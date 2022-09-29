import React from 'react';

import { Stats } from '##/components/Stats';
import { exampleData } from '##/components/Stats/__mocks__/examples.mock';
import { Example } from '##/stand/components/Example';

export const StatsExampleSuccess = () => (
  <Example>
    <Stats {...exampleData} size="2xs" />
  </Example>
);

export const StatsExampleWarning = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="warning" />
  </Example>
);

export const StatsExampleError = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="error" />
  </Example>
);

export const StatsExampleSystem = () => (
  <Example>
    <Stats {...exampleData} size="2xs" status="system" />
  </Example>
);
