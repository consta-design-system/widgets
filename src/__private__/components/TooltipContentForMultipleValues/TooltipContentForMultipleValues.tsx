import React from 'react'

import { Text } from '@consta/uikit/Text'
import _ from 'lodash'

import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { getFormattedValue } from '@/__private__/utils/chart'
import { LegendItem } from '@/LegendItem/LegendItem'

import './TooltipContentForMultipleValues.css'

const cnTooltipContentForMultipleValues = cn('TooltipContentForMultipleValues')

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
    <div className={cnTooltipContentForMultipleValues('Container')}>
      {title && (
        <>
          <Text
            as="div"
            size="xs"
            weight="bold"
            view="primary"
            className={cnTooltipContentForMultipleValues('Title')}
          >
            {title}
          </Text>
          <div className={cnTooltipContentForMultipleValues('Divider')} />
        </>
      )}

      <div className={cnTooltipContentForMultipleValues('Content')}>
        {items.map(({ name, color, value }, idx) => {
          const formattedValue = getFormattedValue(value ?? null, formatValueForTooltip)

          return (
            <React.Fragment key={idx}>
              <LegendItem
                type={_.isNumber(value) ? 'dot' : 'warning'}
                color={color}
                size="xs"
                className={cnTooltipContentForMultipleValues('LegendItem', {
                  isSingleColumn: !name,
                })}
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
