import React, { HTMLAttributes } from 'react'

const margins = ['2xs', 'xs', 's', 'm', 'l'] as const
type Margin = typeof margins[number]

type Props = HTMLAttributes<HTMLDivElement> & {
  margin?: Margin
  width?: string | number
  height?: string | number
}

const getMargin = (margin: Margin) => `var(--space-${margin})`

export const Example: React.FC<Props> = ({
  margin = 'm',
  width,
  height,
  style,
  children,
  ...divProps
}) => {
  const computedStyle: React.CSSProperties = {
    ...style,
    margin: `${getMargin(margin)} 0`,
    width,
    height,
  }

  return (
    <div {...divProps} style={computedStyle}>
      {children}
    </div>
  )
}
