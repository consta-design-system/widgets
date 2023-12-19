import './LegendItem.css';

import { IconProps } from '@consta/icons/Icon';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

const cnLegendItem = cn('LegendItem');

export const iconTypes = ['dot', 'line', 'lineBold', 'gap'] as const;
export type IconType = typeof iconTypes[number];
export type Icon = IconType | React.FC<IconProps>;

export const sizes = ['xs', 's', 'm'] as const;
export type Size = typeof sizes[number];

export type LegendItemMouseEventHandler<ITEM> = (props: {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  item: ITEM;
}) => void;

type CommonProps = {
  label: string;
  color?: string;
  icon?: Icon;
  size?: Size;
  className?: string;
  /** Обрезать текст, если он больше 2 строк */
  shouldCropText?: boolean;
  children?: never;
};

type LegendItem = (
  props: PropsWithHTMLAttributesAndRef<CommonProps, HTMLDivElement>,
) => React.ReactElement | null;

export const LegendItem: LegendItem = React.forwardRef((props, ref) => {
  const {
    label,
    color,
    icon = 'dot',
    size = 's',
    className,
    shouldCropText,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = props;
  const Icon = typeof icon === 'function' ? icon : null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className={cnLegendItem({ size }, [className])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        ['--icon-color' as string]: color,
      }}
    >
      {(color || Icon) && (
        <div className={cnLegendItem('SignWrapper', { custom: !!Icon })}>
          {/*
            Эта дополнительная вложенность необходима чтобы получить возможность
            применить vertical-align к вложенному элементу, так как vertical-align
            не может примениться к элементу у которого родитель flex или inline-flex.

            Другие типы выравнивания нам не подходят потому что:
            - `align-items: center` центрирует по всей высоте и ломает отображение
              легенды с многострочным текстом;
            - `align-items: baseline` из-за невозможности применить отрицательный
              сдвиг используя margin, который необходим для размеров `s` и `xs`.
          */}
          {Icon ? (
            <Icon />
          ) : (
            <div className={cnLegendItem('Sign', { icon: icon as string })} />
          )}
        </div>
      )}
      <Text
        as="span"
        size={size}
        view="primary"
        lineHeight="m"
        display="inlineBlock"
        className={cnLegendItem('Text', { isSeparating: shouldCropText })}
      >
        {label}
      </Text>
    </div>
  );
});
