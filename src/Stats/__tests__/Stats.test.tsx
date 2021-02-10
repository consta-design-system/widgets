import React from 'react'

import { render } from '@testing-library/react'

import { Stats } from '../Stats'

type Props = React.ComponentProps<typeof Stats>

const renderComponent = (props: Props) => {
  return render(<Stats {...props} />)
}

describe('Компонент Stats', () => {
  it('render без ошибок', () => {
    expect(() => renderComponent({ size: '2xs', value: 100 })).not.toThrow()
  })
})
