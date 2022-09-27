import { useBoolean, useText } from '@consta/stand';
import React from 'react';

import { LinearChart } from '../LinearChart';

const colors = {
  first: 'var(--color-bg-success)',
  second: 'var(--color-bg-normal)',
};

const Variants = () => {
  const withDots = useBoolean('withDots', false);
  const withGradient = useBoolean('withGradient', true);
  const showGuide = useBoolean('showGuide', true);
  const withPaddings = useBoolean('withPaddings', false);
  const unit = useText('unit', 'г/моль');

  const lines = [
    {
      values: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 4 },
        { x: 4, y: 3 },
      ],
      dots: withDots,
      lineName: 'Северный бур',
      withGradient,
      color: colors.first,
    },
  ];

  const gridConfig = {
    x: {
      showGuide,
      withPaddings,
    },
    y: {
      showGuide,
      withPaddings,
    },
  };

  return <LinearChart lines={lines} gridConfig={gridConfig} unit={unit} />;
};

export default Variants;
