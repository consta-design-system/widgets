import React from 'react'

import { cn } from '@/__private__/utils/bem'

import './Title.css'

const cnTitle = cn('Title')

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Title: React.FC<Props> = ({ children, className, style }) => {
  if (!children) {
    return null
  }

  return (
    <div className={cnTitle('Main', [className])} style={style}>
      {children}
    </div>
  )
}
