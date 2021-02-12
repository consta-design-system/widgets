import { GroupItem as CoreGroup } from '@/__private__/components/BarChart/components/Group'

import { Group } from '../'
import { transformGroupsToCommonGroups } from '../helpers'

describe('transformGroupsToCoreGroups', () => {
  const groups: readonly Group[] = [
    {
      groupName: 'март',
      values: [4, 2, undefined],
    },
  ]

  it('преобразует BarChart группы к основным группам', () => {
    const received = transformGroupsToCommonGroups(groups, ['red', 'blue', 'green'], false)

    const expected: readonly CoreGroup[] = [
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

  it('преобразует BarChart группы к основным группам без пустых колонок при наличии соответствующего флага', () => {
    const received = transformGroupsToCommonGroups(groups, ['red', 'blue', 'green'], true)

    const expected: readonly CoreGroup[] = [
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
