import times from 'lodash/times'

const sectionWithOnlyZeroData = [...times(3, () => 0)] as const

const colors = {
  first: 'var(--color-bg-alert)',
  second: 'var(--color-bg-caution)',
  third: 'var(--color-bg-normal)',
}

export const donutData = {
  data: [
    {
      name: 'Северный бур',
      color: colors.first,
      values: [1],
    },
    {
      name: 'Южный бур',
      color: colors.second,
      values: [4],
    },
    {
      name: 'Западный бур',
      color: colors.third,
      values: [7],
    },
  ],
}

export const donutDataItemWithoutData = {
  data: {
    name: 'Неизвестный бур',
    color: '#9F0CE9',
    values: [null, null, null],
  },
}

export const donutDataItemsWithZeroData = {
  data: [
    {
      name: 'Первый нулевой бур',
      color: colors.first,
      values: sectionWithOnlyZeroData,
    },
    {
      name: 'Второй нулевой бур',
      color: colors.second,
      values: sectionWithOnlyZeroData,
    },
    {
      name: 'Третий нулевой бур',
      color: colors.third,
      values: sectionWithOnlyZeroData,
    },
  ],
}

export const donutDataItemsWithZeroAndPositiveData = {
  data: [
    {
      ...donutDataItemsWithZeroData.data[0],
      name: 'Первый околонулевой бур',
      values: [0, 10, 0],
    },
    donutDataItemsWithZeroData.data[1],
    donutDataItemsWithZeroData.data[2],
  ],
}

export const donutProgressData = {
  data: [
    {
      name: 'Северный бур',
      color: colors.first,
      values: [60],
    },
    {
      name: 'Южный бур',
      color: colors.second,
      values: [20],
    },
    {
      name: 'Западный бур',
      color: colors.third,
      values: [10],
    },
  ],
}
