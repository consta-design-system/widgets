import React, { forwardRef, HTMLAttributes } from 'react'

import { CoreDonutChart } from '@/__private__/components/CoreDonutChart'
import { DonutDataItem, SortValue } from '@/__private__/components/CoreDonutChart/helpers'
import { HalfDonut } from '@/__private__/components/CoreDonutChart/helpers'
import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { Legend } from '@/Legend/Legend'

import { filterComputedData, getComputedData, getLimitSizeSide, LegendPosition } from './helpers'
import './DonutChart.css'

const cnDonutChart = cn('DonutChart')

type Props = HTMLAttributes<HTMLDivElement> & {
  data: readonly DonutDataItem[]
  value?: string
  label?: string
  halfDonut?: HalfDonut
  valueSize?: number
  sums?: readonly number[]
  legendPosition?: LegendPosition
  formatValue?: (value: string) => string
  formatLabel?: (label: string) => string
  formatValueForTooltip?: FormatValue
  sortValue?: SortValue | null
}

export const DonutChart = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { data, halfDonut, legendPosition, sums, ...rest } = props

  const legendItems = data.map(item => ({ text: item.name, color: item.color }))

  return (
    <div ref={ref} className={cnDonutChart({ legendPosition })}>
      {legendPosition && (
        <div className={cnDonutChart('Legend')}>
          <Legend
            items={legendItems}
            direction={legendPosition === 'right' || legendPosition === 'left' ? 'column' : 'row'}
            size="m"
            icon="dot"
            getItemColor={item => item.color}
            getItemLabel={item => item.text}
          />
        </div>
      )}
      <CoreDonutChart
        {...rest}
        limitSizeSide={getLimitSizeSide(legendPosition)}
        data={getComputedData(data, sums)}
        halfDonut={halfDonut}
        filterTooltipItem={filterComputedData}
        showTooltip
      />
    </div>
  )
})
