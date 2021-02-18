import React from 'react'

import { render } from '@testing-library/react'

import { Legend } from '../Legend'

type Props = React.ComponentProps<typeof Legend>

const commonProps: Props = {
  data: [],
  direction: 'row',
  labelType: 'dot',
  size: 's',
  labelPosition: 'left',
}

const renderComponent = (props: Props) => {
  return render(<Legend {...props} />)
}

describe('Компонент LegendItem', () => {
  it('render без ошибок', () => {
    expect(() => renderComponent(commonProps)).not.toThrow()
  })
})
