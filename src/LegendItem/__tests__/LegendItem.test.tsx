import React from 'react'

import { render } from '@testing-library/react'

import { LegendItem } from '../LegendItem'

type Props = React.ComponentProps<typeof LegendItem>

const renderComponent = (props: Props) => {
  return render(<LegendItem {...props} />)
}

describe('Компонент LegendItem', () => {
  it('render без ошибок', () => {
    expect(() => renderComponent({ children: 'Content' })).not.toThrow()
  })
})
