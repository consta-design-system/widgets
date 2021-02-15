import { ComponentProps } from 'react'

import { Stats } from '../Stats'

type Props = ComponentProps<typeof Stats>

export const exampleData: Props = {
  value: 2170,
  title: 'Молний за год',
  unit: 'разрядов',
  rate: '20%',
  status: 'success',
  layout: 'default',
  size: 'xs',
}
