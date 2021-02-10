import * as React from 'react'

import { render } from '@testing-library/react'

import { cnComponent, Component } from '../Component'

type ComponentProps = React.ComponentProps<typeof Component>

const testId = cnComponent()

const renderComponent = (props: ComponentProps) => {
  return render(<Component data-testid={testId} {...props} />)
}

describe('Компонент Component', () => {
  it('render без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow()
  })
})
