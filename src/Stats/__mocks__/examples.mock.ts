import { ComponentProps } from 'react'

import { Stats } from '../Stats'

type Props = ComponentProps<typeof Stats>

export const exampleData: Props = {
  title: '',
  value: 146,
  numberBadge: 20,
  unit: 'единицы',
  layout: 'default',
  size: 'xs',
}
