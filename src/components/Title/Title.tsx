import './Title.css';

import React from 'react';

import { cn } from '##/utils/bem';

const cnTitle = cn('Title');

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Title: React.FC<Props> = ({ children, style }) => {
  if (!children) {
    return null;
  }

  return (
    <div className={cnTitle('Main')} style={style}>
      {children}
    </div>
  );
};
