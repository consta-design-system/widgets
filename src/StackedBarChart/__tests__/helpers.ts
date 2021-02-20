import { Group } from '@/StackedBarChart'
import { transformGroupsToCommonGroups } from '@/StackedBarChart/helpers'

describe('transformGroupsToCommonGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [[{ value: 4, color: 'red' }], [{ value: 2, color: 'blue' }], undefined],
    },
    {
      groupName: 'апрель',
      values: [[{ value: undefined, color: 'red' }], [{ value: 5, color: 'blue' }]],
    },
  ]

  it('преобразует StackedBarChart группы к основным группам', () => {
    const result = transformGroupsToCommonGroups(groups)

    expect(result).toEqual([
      {
        name: 'март',
        total: 6,
        columns: [
          {
            total: 4,
            sections: [{ color: 'red', value: 4 }],
          },
          {
            total: 2,
            sections: [{ color: 'blue', value: 2 }],
          },
          { total: 0, sections: undefined },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
      {
        name: 'апрель',
        total: 5,
        columns: [
          { total: 0, sections: undefined },
          { total: 5, sections: [{ color: 'blue', value: 5 }] },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
    ])
  })
})
