import { ComponentProps } from 'react';

import { Stats } from '../Stats';

type Props = ComponentProps<typeof Stats>;

export const exampleData: Props = {
  value: 2170,
  title: 'Скорость молнии',
  unit: 'км/с',
  rate: '20%',
  status: 'success',
  layout: 'default',
  size: 'xs',
};
