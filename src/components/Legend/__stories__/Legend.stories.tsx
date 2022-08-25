import { Text } from '@consta/uikit/Text';
import { action } from '@storybook/addon-actions';
import { object, select, text } from '@storybook/addon-knobs';
import React from 'react';

import { iconTypes, sizes } from '##/components/LegendItem';
import { LinearChart } from '##/components/LinearChart/LinearChart';
import { createMetadata, createStory } from '##/storybook';

import { interactiveData, withChart } from '../data.mock';
import { directions, Legend } from '../Legend';
import mdx from './Legend.mdx';

type LegendItem = {
  color: string;
  text: string;
};

const getCommonProps = () =>
  ({
    direction: select('direction', directions, 'column'),
    icon: select('type', iconTypes, iconTypes[0]),
    size: select('size', sizes, sizes[1]),
  } as const);

export const Interactive = createStory(
  () => (
    <Legend
      {...getCommonProps()}
      items={object('data', interactiveData)}
      getItemLabel={(item) => item.text}
      getItemColor={(item) => item.color}
    />
  ),
  {
    parameters: {
      environment: {
        style: {
          width: 200,
        },
      },
    },
  },
);

export const WithChart = createStory(
  () => {
    const handleClick = ({ item }: { item: LegendItem }) =>
      alert(JSON.stringify(item));

    return (
      <>
        <div style={{ height: 200, marginBottom: 'var(--space-m)' }}>
          <LinearChart {...withChart.linearChartProps} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <Legend
            {...getCommonProps()}
            items={object('data', withChart.data)}
            onItemMouseEnter={action('onItemMouseEnter')}
            onItemMouseLeave={action('onItemMouseLeave')}
            onItemClick={handleClick}
            getItemLabel={(item) => item.text}
            getItemColor={(item) => item.color}
          />
        </div>
      </>
    );
  },
  {
    name: 'с графиком',
    parameters: {
      environment: {
        style: {
          width: 400,
        },
      },
    },
  },
);

export const WithTitle = createStory(
  () => (
    <Legend
      {...getCommonProps()}
      items={object('data', interactiveData)}
      getItemLabel={(item) => item.text}
      getItemColor={(item) => item.color}
      title={
        <Text as="div" view="primary" size="m">
          {text('title', 'Заголовок')}
        </Text>
      }
    />
  ),
  {
    name: 'с заголовком',
  },
);

export default createMetadata({
  title: 'Компоненты|/Legend',
  id: 'components/Legend',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
