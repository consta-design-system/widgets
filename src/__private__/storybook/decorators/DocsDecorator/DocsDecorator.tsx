import React from 'react'

import { presetGpnDisplay, Theme } from '@consta/uikit/Theme'
import { DocsContainer } from '@storybook/addon-docs/dist/blocks'

import { cn } from '@/__private__/utils/bem'

import './DocsDecorator.css'

type DocsDecoratorProps = React.ComponentProps<typeof DocsContainer>

const cnDocsDecorator = cn('DocsDecorator')

export const DocsDecorator: React.FC<DocsDecoratorProps> = props => {
  const { children, context } = props

  return (
    <Theme preset={presetGpnDisplay} className={cnDocsDecorator()}>
      <DocsContainer context={context}>
        <div className={cnDocsDecorator('Wrapper')}>{children}</div>
      </DocsContainer>
    </Theme>
  )
}
