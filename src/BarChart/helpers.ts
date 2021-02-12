import { isNotNil } from '@consta/widgets-utils/lib/type-guards'

import { TypeColumn } from '@/__private__/components/BarChart'
import { GroupItem } from '@/__private__/components/BarChart/components/Group'

import { Column, Group } from './'

const getDefaultColumnItem = (isEmptyColumnsHidden: boolean) =>
  isEmptyColumnsHidden
    ? undefined
    : {
        total: 0,
        sections: undefined,
      }

const getTransformColumn = (
  colors: readonly string[],
  isEmptyColumnsHidden: boolean,
  filter: (value: number) => boolean
) => (column: Column, index: number) => {
  const defaultColumnItem = getDefaultColumnItem(isEmptyColumnsHidden)

  if (!isNotNil(column)) {
    return defaultColumnItem
  }

  return filter(column)
    ? {
        total: column,
        sections: [{ color: colors[index], value: column }],
      }
    : defaultColumnItem
}

export const transformGroupsToCommonGroups = (
  groups: readonly Group[],
  colors: readonly string[],
  isEmptyColumnsHidden: boolean
) => {
  const getColumns = getTransformColumn(colors, isEmptyColumnsHidden, v => v >= 0)
  const getReversedColumns = getTransformColumn(colors, isEmptyColumnsHidden, v => v < 0)

  return groups.map(({ groupName, values }) => {
    const columns = values.map(getColumns)
    const reversedColumns = values.map(getReversedColumns)

    return {
      name: groupName,
      columns: isEmptyColumnsHidden ? columns.filter(Boolean) : columns,
      reversedColumns: isEmptyColumnsHidden ? reversedColumns.filter(Boolean) : reversedColumns,
    }
  })
}

export const getColumnsLengthArray = (groupsItem: GroupItem[], typeColumn: TypeColumn) => {
  let columnsLengthArray: number[] = []

  groupsItem.map((group: GroupItem) =>
    group[typeColumn].map(column => {
      if (column?.sections?.[0]?.value && column?.sections?.[0]?.value !== undefined) {
        columnsLengthArray = columnsLengthArray.concat(column.sections[0].value)
      }
    })
  )
  return columnsLengthArray
}

export const getMaxNumberGroupsArray = (groupsItem: GroupItem[]) => {
  let columnsArray: number[] = []

  groupsItem.map((group: GroupItem) => {
    if (group?.columns) {
      columnsArray = columnsArray.concat(group.columns.length)
    }
  })
  return columnsArray
}
