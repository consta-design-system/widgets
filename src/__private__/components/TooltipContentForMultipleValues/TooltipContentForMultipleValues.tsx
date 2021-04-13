import React from 'react'

import { Text } from '@consta/uikit/Text'
import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import _ from 'lodash'

import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { getFormattedValue } from '@/__private__/utils/chart'
import { numberFormatter } from '@/__private__/utils/formatters'
import { formatForArray } from '@/__private__/utils/formatForArray'
import { LegendItem } from '@/LegendItem/LegendItem'

import './TooltipContentForMultipleValues.css'

const cnTooltipContent = cn('TooltipContentForMultipleValues')

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
  const newItems = items.map(item => item.value || 0)
  const formatItems = formatForArray(newItems)
  const withNoNames = items.every(item => !item.name)
  const withNoColors = items.every(item => !item.color)

  return (
    <div className={cnTooltipContent('Container')}>
      {title && (
        <>
          <Text
            as="div"
            size="xs"
            weight="bold"
            view="primary"
            className={cnTooltipContent('Title')}
          >
            {title}
          </Text>
        </>
      )}

      <div className={cnTooltipContent('Content')}>
        {items.map(({ name, color, value }, idx) => {
          const formattedValue = getFormattedValue(value ?? null, formatValueForTooltip)
          const newFormattedValue = isNotNil(value)
            ? formatItems[idx] +
              ' ' +
              formattedValue
                .split(' ')
                .slice(1)
                .join(' ')
            : formattedValue

          return (
            <React.Fragment key={idx}>
              <LegendItem
                label={name || ''}
                icon={_.isNumber(value) ? 'dot' : undefined}
                color={color}
                size="xs"
                className={cnTooltipContent('LegendItem', {
                  isSingleColumn: !name && !value,
                  withPadding: !color && !withNoColors,
                  withNoNames,
                })}
              />
              {(name || value) && (
                <Text
                  className={cnTooltipContent('ItemValue')}
                  as="span"
                  size="xs"
                  weight={withNoNames ? 'regular' : 'bold'}
                  view="primary"
                >
                  {numberFormatter(newFormattedValue)}
                </Text>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
