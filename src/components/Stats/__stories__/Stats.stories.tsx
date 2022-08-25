import { IconLightningBolt } from '@consta/uikit/IconLightningBolt';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import React from 'react';

import { createMetadata, createStory, optionalSelect } from '##/storybook';
import { numberFormatter } from '##/utils/formatters';

import { Stats } from '..';
import { iconsArrowRate, layouts, sizes, statuses } from '../helpers';
import mdx from './Stats.mdx';

type Props = React.ComponentProps<typeof Stats> & {
  showIconTitle?: boolean;
};

const getKnobs = (props: Partial<Props> = {}) => {
  return {
    value: number('value', props.value || 2170),
    placeholder: text('placeholder', props.placeholder || '—'),
    title: text('title', props.title ?? 'Молний за год'),
    iconTitle: boolean('iconTitle', props.showIconTitle ?? false)
      ? props.iconTitle ?? IconLightningBolt
      : undefined,
    unit: text('unit', props.unit ?? 'разрядов'),
    rate: text('rate', props.rate ?? '20%'),
    iconArrowRate: optionalSelect(
      'iconArrowRate',
      iconsArrowRate,
      props.iconArrowRate,
    ),
    status: select('status', statuses, props.status || statuses[0]),
    layout: select('layout', layouts, props.layout || layouts[0]),
    size: select('size', sizes, props.size || sizes[3]),
    formatValue: boolean('formatValue', true) ? numberFormatter : String,
    formatRate: boolean('formatRate', true) ? numberFormatter : String,
  };
};

export const Interactive = createStory(() => <Stats {...getKnobs()} />);

export const WithIconTitle = createStory(
  () => <Stats {...getKnobs({ showIconTitle: true })} />,
  {
    name: 'С иконкой в заголовке',
  },
);

export const WithoutTitle = createStory(
  () => <Stats {...getKnobs({ title: '' })} />,
  {
    name: 'Без заголовка',
  },
);

export const WithoutUnit = createStory(
  () => <Stats {...getKnobs({ unit: '' })} />,
  {
    name: 'Без единиц',
  },
);

export const WithIconArrowRateUp = createStory(
  () => <Stats {...getKnobs({ iconArrowRate: 'up' })} />,
  {
    name: 'С иконкой положительного показателя изменений',
  },
);

export const WithIconArrowRateDown = createStory(
  () => <Stats {...getKnobs({ iconArrowRate: 'down', status: 'error' })} />,
  {
    name: 'С иконкой отрицательного показателя изменений',
  },
);

export const WithoutRate = createStory(
  () => <Stats {...getKnobs({ rate: '' })} />,
  {
    name: 'Без показателя изменений',
  },
);

export const ReversedLayout = createStory(
  () => <Stats {...getKnobs({ layout: 'reversed' })} />,
  {
    name: 'С единицами справа',
  },
);

export default createMetadata({
  title: 'Компоненты|/Stats',
  id: 'components/Stats',
  parameters: {
    docs: {
      page: mdx,
    },
    environment: {
      style: {
        width: 200,
      },
    },
  },
});
