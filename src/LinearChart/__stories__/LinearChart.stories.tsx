import React from 'react'

// import { getArrayWithRandomInt } from '@consta/widgets-utils/lib/array'
// import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
// import { boolean, number, object, select, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/__private__/storybook'

import { LegendAlign, LinearChart } from '../LinearChart'

import mdx from './LinearChart.mdx'

const IGNORE_PROPS = ['title', 'directionX', 'directionY'] as const

const colors = {
  first: 'var(--color-bg-success)',
  second: 'var(--color-bg-normal)',
}

const decorators = [
  withSmartKnobs({
    ignoreProps: IGNORE_PROPS,
  }),
] as const

const parameters = {
  docs: {
    page: mdx,
  },
  environment: {
    style: {
      width: '60vw',
      height: '50vh',
    },
  },
} as const

// export const Horizontal = createStory(
//   () => {
//     return <LinearChart {...getCommonProps()} isHorizontal />
//   },
//   {
//     name: 'горизонтальный',
//     decorators,
//     parameters,
//   }
// )

// export const WithNullData = createStory(
//   () => {
//     return (
//       <LinearChart
//         lines={[
//           {
//             values: [
//               { x: 0, y: null },
//               { x: 1, y: 1 },
//               { x: 2, y: 0 },
//               { x: 3, y: null },
//               { x: 4, y: null },
//               { x: 5, y: 3 },
//               { x: 6, y: null },
//               { x: 7, y: 1 },
//               { x: 8, y: 2 },
//               { x: 9, y: null },
//             ],
//             dots: true,
//             lineName: 'Северный бур',
//             withGradient: true,
//             color: colors.first,
//           },
//         ]}
//         gridConfig={getGridConfig()}
//         formatValueForLabel={String}
//         isHorizontal
//         withZoom
//       />
//     )
//   },
//   {
//     name: 'с пропусками',
//     decorators,
//     parameters,
//   }
// )
//
// export const WithClickHandler = createStory(
//   () => {
//     return (
//       <LinearChart
//         {...getCommonProps()}
//         isHorizontal
//         onClickHoverLine={value => alert(new Date(value))}
//       />
//     )
//   },
//   {
//     name: 'с обработкой клика',
//     decorators,
//     parameters,
//   }
// )

export const LinearChartSimple = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        withPaddings: false,
      },
      y: {
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'стандартный',
    decorators,
    parameters,
  }
)

export const LinearChartWithDots = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        withPaddings: false,
      },
      y: {
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с точками в значениях',
    decorators,
    parameters,
  }
)

export const LinearChartWithHideOY = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        withPaddings: false,
      },
      y: {
        showGuide: false,
        showGrid: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'скрытие сетки ординат',
    decorators,
    parameters,
  }
)

export const LinearChartWithHideOX = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        showGrid: false,
        withPaddings: false,
      },
      y: {
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'скрытие сетки абсцисс',
    decorators,
    parameters,
  }
)

export const LinearChartWithPaddings = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        withPaddings: true,
      },
      y: {
        showGuide: false,
        withPaddings: true,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с отступами внутри',
    decorators,
    parameters,
  }
)

export const LinearChartWithHide1stLabel = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: false,
        withPaddings: true,
      },
      y: {
        showGuide: false,
        withPaddings: true,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} xHideFirstLabel={true} />
  },
  {
    name: 'с пропуском первого лейбла по Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithMinMax = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: false,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с min, max по (Ox, Oy)',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideOX = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением оси Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideOY = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением оси Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideAll = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением осей Ox, Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithNull = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 3.5, y: null },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с пропуском значений',
    decorators,
    parameters,
  }
)

export const LinearChartWithDashed = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        dashed: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с пунктирной линией',
    decorators,
    parameters,
  }
)

export const LinearChartWithGradient = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: true,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с градиентом',
    decorators,
    parameters,
  }
)

export const LinearChartWithGradient2 = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: -0.5, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 5 },
          { x: 3, y: 2 },
          { x: 4, y: 0 },
          { x: 5, y: -1 },
          { x: 6, y: -2.5 },
          { x: 7, y: -0.5 },
          { x: 8, y: 1.5 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: true,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 9,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с градиентом 2',
    decorators,
    parameters,
  }
)

export const LinearChartWithPercentage = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 0.1 },
          { x: 2, y: 0.2 },
          { x: 3, y: 0.4 },
          { x: 4, y: 0.4 },
          { x: 5, y: 0.3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -0.1,
        max: 0.6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} yLabelsShowInPercent={true} />
  },
  {
    name: 'с % по Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithRotateXLables = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} xLabelsShowVertical={true} />
  },
  {
    name: 'с повёрнутыми лейблами по Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithGridTicks = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 24,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 16,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с большим количеством делений',
    decorators,
    parameters,
  }
)

export const LinearChartWithUnit = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} yDimensionUnit="г/моль" />
  },
  {
    name: 'с размерностью по Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithThreshold = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1.5 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3.5, y: 0 },
          { x: 4, y: 10 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 1, y: 4 },
          { x: 1.5, y: -1 },
          { x: 2, y: 6 },
          { x: 3, y: 2 },
          { x: 3.5, y: 6 },
          { x: 4, y: 2 },
          { x: 4.5, y: 8 },
          { x: 5, y: 6 },
        ],
        dots: true,
        lineName: 'Южная нора',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -2,
        max: 12,
        showGuide: true,
        withPaddings: false,
      },
    }
    const threshold = {
      max: {
        values: [
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 5, y: 10 },
        ],
        label: 'Максимум',
      },
      min: {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
        ],
        label: 'Минимум',
      },
    }

    return (
      <LinearChart
        lines={lines}
        gridConfig={gridConfig}
        threshold={threshold}
        yDimensionUnit={'килограммы'}
      />
    )
  },
  {
    name: 'с пределами',
    decorators,
    parameters,
  }
)

export const LinearChartWithTooltipDot = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1.5 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3.5, y: 0 },
          { x: 4, y: 10 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 1, y: 4 },
          { x: 1.5, y: -1 },
          { x: 2, y: 6 },
          { x: 3, y: 2 },
          { x: 3.5, y: 6 },
          { x: 4, y: 2 },
          { x: 4.5, y: 8 },
          { x: 5, y: 6 },
        ],
        dots: true,
        lineName: 'Южная нора',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -2,
        max: 12,
        showGuide: true,
        withPaddings: false,
      },
    }
    const threshold = {
      max: {
        values: [
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 5, y: 10 },
        ],
        label: 'Максимум',
      },
      min: {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
        ],
        label: 'Минимум',
      },
    }

    return (
      <LinearChart
        lines={lines}
        gridConfig={gridConfig}
        threshold={threshold}
        yDimensionUnit="килограммы"
        tooltipVariant="dot"
        onClickHoverDot={value => alert(JSON.stringify(value))}
      />
    )
  },
  {
    name: 'с тултипом по точке',
    decorators,
    parameters,
  }
)

export const LinearChartWithLimitedSteps = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1.5 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 3.5, y: 0 },
          { x: 4, y: 10 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 1, y: 4 },
          { x: 1.5, y: -1 },
          { x: 2, y: 6 },
          { x: 3, y: 2 },
          { x: 3.5, y: 6 },
          { x: 4, y: 2 },
          { x: 4.5, y: 8 },
          { x: 5, y: 6 },
        ],
        dots: true,
        lineName: 'Южная нора',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -2,
        max: 12,
        showGuide: true,
        withPaddings: false,
      },
    }
    const threshold = {
      max: {
        values: [
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 5, y: 10 },
        ],
      },
      min: {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
        ],
      },
    }

    return (
      <LinearChart
        lines={lines}
        gridConfig={gridConfig}
        threshold={threshold}
        yDimensionUnit={'килограммы'}
        limitMinimumStepSize={true}
      />
    )
  },
  {
    name: 'с ограниченным размером шага по Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithLegend = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 0, y: 2 },
          { x: 1, y: 4 },
          { x: 3, y: 5 },
        ],
        dots: false,
        lineName: 'Южная нора',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    const legend = {
      items: [
        {
          color: colors.first,
          text: 'Успех',
        },
        {
          color: colors.second,
          text: 'Болъ',
        },
      ],
      align: 'right' as LegendAlign,
    }

    return <LinearChart lines={lines} gridConfig={gridConfig} legend={legend} />
  },
  {
    name: 'с легендой',
    decorators,
    parameters,
  }
)

export const LinearChartWithValues = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        showValues: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 5, y: 2 },
        ],
        dots: false,
        showValues: true,
        formatValueForDot: (v: number) => `${v} ツ`,
        lineName: 'Северный руб',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'со значениями',
    decorators,
    parameters,
  }
)

//
// const renderTitle = (defaultText: string = '') => {
//   const title = text('title', defaultText)
//
//   return title ? (
//     <Text as="div" view="primary" size="m">
//       {title}
//     </Text>
//   ) : null
// }
//

export default createMetadata({
  title: 'Компоненты|/LinearChart',
  id: 'components/LinearChart',
})
