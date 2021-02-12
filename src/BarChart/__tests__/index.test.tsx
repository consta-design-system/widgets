import * as React from 'react'

import { BarChart } from '../'

describe('BarChart', () => {
  it('не крашится при динамической смене количества групп', () => {
    const commonProps = {
      colors: ['var(--color-bg-normal)', 'var(--color-bg-alert)', 'var(--color-bg-warning)'],
      gridTicks: 5,
      valuesTicks: 1,
    }

    const barChart = TestRenderer.create(
      <BarChart
        {...commonProps}
        groups={[
          {
            groupName: 'март',
            values: [410, 600, 270],
          },
          {
            groupName: 'апрель',
            values: [670, 1000, 1100],
          },
          {
            groupName: 'май',
            values: [1200, 630, 100],
          },
        ]}
      />
    )

    expect(() => {
      barChart.update(
        <BarChart
          {...commonProps}
          groups={[
            {
              groupName: 'март',
              values: [410],
            },
            {
              groupName: 'апрель',
              values: [670],
            },
          ]}
        />
      )
    }).not.toThrow()
  })
})
