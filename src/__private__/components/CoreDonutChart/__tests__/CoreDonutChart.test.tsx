import React from 'react'

import { render } from '@testing-library/react'

import { CoreDonutChart } from '../CoreDonutChart'

type Props = React.ComponentProps<typeof CoreDonutChart>

const commonProps: Props = {
  data: [],
  showTooltip: false,
}

const renderComponent = (props: Props) => {
  return render(<CoreDonutChart {...props} />)
}

describe('Компонент CoreDonutChart', () => {
  it('render без ошибок', () => {
    expect(() => renderComponent(commonProps)).not.toThrow()
  })
})
