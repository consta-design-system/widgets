import { GroupItem } from '@/__private__/components/CoreBarChart/Group'
import { Group } from '@/BarChart'

import { transformGroupsToCommonGroups } from '../helpers'

describe('transformGroupsToCoreGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [4, 2, undefined],
    },
  ]

  it('преобразует CoreBarChart группы к основным группам', () => {
    const received = transformGroupsToCommonGroups(groups, ['red', 'blue', 'green'], false)

    const expected: readonly GroupItem[] = [
      {
        name: 'март',
        columns: [
          { total: 4, sections: [{ color: 'red', value: 4 }] },
          { total: 2, sections: [{ color: 'blue', value: 2 }] },
          { total: 0, sections: undefined },
        ],
        reversedColumns: [
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
          { total: 0, sections: undefined },
        ],
      },
    ]

    expect(received).toEqual(expected)
  })

  it('преобразует CoreBarChart группы к основным группам без пустых колонок при наличии соответствующего флага', () => {
    const received = transformGroupsToCommonGroups(groups, ['red', 'blue', 'green'], true)

    const expected: readonly GroupItem[] = [
      {
        name: 'март',
        columns: [
          { total: 4, sections: [{ color: 'red', value: 4 }] },
          { total: 2, sections: [{ color: 'blue', value: 2 }] },
        ],
        reversedColumns: [],
      },
    ]

    expect(received).toEqual(expected)
  })
})
