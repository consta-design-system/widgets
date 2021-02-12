import React from 'react'

import { Text } from '@consta/uikit/Text'
import classnames from 'classnames'
import _ from 'lodash'

import { FormatValue } from '@/__private__/types'
import { getFormattedValue } from '@/__private__/utils/chart'
import { LegendItem } from '@/LegendItem'

import css from './index.css'

export type Item = {
  name?: string
  value?: number | null
  color?: string
}

type Props = {
  title?: string
  items: readonly Item[]
  formatValueForTooltip?: FormatValue
}

export const TooltipContentForMultipleValues: React.FC<Props> = ({
  title,
  items,
  formatValueForTooltip,
}) => {
  return (
    <div className={css.container}>
      {title && (
        <>
          <Text as="div" size="xs" weight="bold" view="primary" className={css.title}>
            {title}
          </Text>
          <div className={css.divider} />
        </>
      )}

      <div className={css.content}>
        {items.map(({ name, color, value }, idx) => {
          const formattedValue = getFormattedValue(value ?? null, formatValueForTooltip)

          return (
            <React.Fragment key={idx}>
              <LegendItem
                type={_.isNumber(value) ? 'dot' : 'warning'}
                color={color}
                fontSize="xs"
                className={classnames(css.legendItem, !name && css.isSingleColumn)}
              >
                {name ?? formattedValue}
              </LegendItem>
              {name && (
                <Text as="span" size="xs" weight="bold" view="primary">
                  {formattedValue}
                </Text>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
