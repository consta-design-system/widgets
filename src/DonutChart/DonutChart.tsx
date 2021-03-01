import React from 'react'

import { CoreDonutChart } from '@/__private__/components/CoreDonutChart'
import {
  Data as DonutData,
  isHalfDonutVertical,
  SortValue,
} from '@/__private__/components/CoreDonutChart/helpers'
import { HalfDonut } from '@/__private__/components/CoreDonutChart/CoreDonutChartPie/CoreDonutChartPie'
import { Data as DonutTextData } from '@/__private__/components/CoreDonutChart/CoreDonutChartText/CoreDonutChartText'
import { FormatValue } from '@/__private__/types'

import { filterComputedData, getComputedData } from './helpers'

type Props = {
  data: readonly DonutData[]
  textData?: DonutTextData
  halfDonut?: HalfDonut
  valueSize?: number
  sums?: readonly number[]
  formatValueForTooltip?: FormatValue
  sortValue?: SortValue | null
}

export const DonutChart: React.FC<Props> = ({ data, sums, halfDonut, ...rest }) => {
  return (
    <CoreDonutChart
      {...rest}
      data={getComputedData(data, sums)}
      halfDonut={halfDonut}
      titlePosition={halfDonut === 'bottom' ? 'bottom' : 'top'}
      textPaddingFromBorder={halfDonut ? 8 : 0}
      showTitle={Boolean(halfDonut)}
      showSubBlock={isHalfDonutVertical(halfDonut)}
      filterTooltipItem={filterComputedData}
      showTooltip
      showText
    />
  )
}
