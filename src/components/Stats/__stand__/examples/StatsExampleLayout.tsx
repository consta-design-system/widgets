import React from 'react';

import { Stats } from '##/components/Stats';
import { exampleData } from '##/components/Stats/__mocks__/examples.mock';
import { Example } from '##/stand/components/Example';

export const StatsExampleLayoutDefault = () => (
  <Example>
    <Stats {...exampleData} layout="default" />
  </Example>
);

export const StatsExampleLayoutReversed = () => (
  <Example>
    <Stats {...exampleData} layout="reversed" />
  </Example>
);
