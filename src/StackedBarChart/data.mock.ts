export const interactiveData = {
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        [
          { value: 30, color: 'var(--color-bg-normal)' },
          { value: 20, color: 'var(--color-bg-alert)' },
          { value: 23, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        [
          { value: 1600, color: 'var(--color-bg-normal)' },
          { value: 40, color: 'var(--color-bg-alert)' },
          { value: 45, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        [
          { value: 640, color: 'var(--color-bg-normal)' },
          { value: 960, color: 'var(--color-bg-alert)' },
          { value: 73, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
  ],
  threshold: { value: 750, color: 'var(--color-bg-normal)' },
  unit: 'тыс. м³',
}

export const withPercentColumnsData = {
  groups: [
    {
      groupName: '1 кв. 2019',
      values: [
        [
          { value: 27, color: 'var(--color-bg-normal)' },
          { value: 46, color: 'var(--color-bg-alert)' },
          { value: 27, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
    {
      groupName: '2 кв. 2019',
      values: [
        [
          { value: 5, color: 'var(--color-bg-normal)' },
          { value: 60, color: 'var(--color-bg-alert)' },
          { value: 35, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
    {
      groupName: '3 кв. 2019',
      values: [
        [
          { value: 60, color: 'var(--color-bg-normal)' },
          { value: 5, color: 'var(--color-bg-alert)' },
          { value: 35, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
    {
      groupName: '4 кв. 2019',
      values: [
        [
          { value: 20, color: 'var(--color-bg-normal)' },
          { value: 30, color: 'var(--color-bg-alert)' },
          { value: 50, color: 'var(--color-bg-warning)' },
        ],
      ],
    },
  ],
}

export const withTwoColumnsData = {
  groups: [
    {
      groupName: 'Q1-2016',
      values: [
        [
          { value: 3840, color: 'var(--color-bg-normal)' },
          { value: 1920, color: 'var(--color-bg-alert)' },
        ],
        [
          { value: 230, color: 'var(--color-bg-warning)' },
          { value: 500, color: 'var(--color-bg-success)' },
        ],
      ],
    },
    {
      groupName: 'Q2-2016',
      values: [
        [
          { value: 1600, color: 'var(--color-bg-normal)' },
          { value: 150, color: 'var(--color-bg-alert)' },
        ],
        [
          { value: 450, color: 'var(--color-bg-warning)' },
          { value: 350, color: 'var(--color-bg-success)' },
        ],
      ],
    },
    {
      groupName: 'Q3-2016',
      values: [
        [
          { value: 640, color: 'var(--color-bg-normal)' },
          { value: 960, color: 'var(--color-bg-alert)' },
        ],
        [
          { value: 730, color: 'var(--color-bg-warning)' },
          { value: 120, color: 'var(--color-bg-success)' },
        ],
      ],
    },
  ],
  unit: 'тыс. м³',
}
