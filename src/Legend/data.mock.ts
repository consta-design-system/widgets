export const interactiveData = [
  {
    color: 'var(--color-bg-alert)',
    text: 'Красноватый текст',
  },
  {
    color: 'var(--color-bg-warning)',
    text: 'Желтоватый текст',
  },
  {
    color: 'var(--color-bg-normal)',
    text: 'Убер длинный и превозмогающий усилия аквамариновый текст',
  },
  {
    color: '#9b51e0',
    text: 'Пурпурный текст',
  },
  {
    color: 'var(--color-bg-success)',
    text: 'Зеленый цвет',
  },
] as const

export const withChart = {
  data: [
    {
      color: 'var(--color-bg-success)',
      text: 'На сопровождении',
    },
    {
      color: 'var(--color-bg-normal)',
      text: 'Всего в бурении',
    },
  ],
  linearChartProps: {
    gridConfig: {
      x: {
        gridTicks: 10,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        gridTicks: 4,
        showGuide: true,
        withPaddings: false,
      },
    },
    lines: [
      {
        color: 'var(--color-bg-success)',
        values: [
          { x: 0, y: -1 },
          { x: 1, y: 3 },
          { x: 2, y: 1 },
          { x: 3, y: 4 },
        ],
        dots: true,
        lineName: 'Северный бур',
        withGradient: true,
      },
      {
        color: 'var(--color-bg-normal)',
        values: [
          { x: 0, y: -2 },
          { x: 1, y: 4 },
          { x: 2, y: 0 },
          { x: 3, y: 5 },
        ],
        lineName: 'Южное месторождение',
      },
    ],
  },
}
