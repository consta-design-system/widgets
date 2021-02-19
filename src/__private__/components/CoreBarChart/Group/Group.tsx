import React, { useEffect, useRef } from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'

import { LabelSize } from '@/__private__/components/CoreBarChart/CoreBarChart'
import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { NumberRange } from '@/__private__/utils/scale'

import { Column, SectionItem } from '../Column/Column'
import { TooltipData } from '../Tooltip/Tooltip'

import { getSections, scalerCommonColumnsGroups, styleGroups, styleOrientation } from './helpers'
import './Group.css'

const cnGroup = cn('Group')

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

export type GroupItem = {
  name: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
  total?: number
}

export type SizeGraphic = {
  width: number
  height: number
}

type Props = {
  item: GroupItem
  isHorizontal: boolean
  activeGroup?: string
  activeSectionIndex?: number
  showValues: boolean
  scalerMaxValue: (value: number) => number
  scalerMinValue: (value: number) => number
  maxNumberGroups: number
  columnLength: number
  reversedColumnLength?: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  onChangeLabelSize?: (size: LabelSize) => void
  style?: React.CSSProperties
  getNumberGridTicks: (length: number) => void
  gridDomain: NumberRange
  limitMinimumCategorySize?: boolean
  maxLabelSize: LabelSize
}

export const Group: React.FC<Props> = props => {
  const {
    item: { name: group, columns, reversedColumns },
    isHorizontal,
    activeGroup,
    activeSectionIndex,
    showValues,
    scalerMaxValue,
    scalerMinValue,
    maxNumberGroups,
    columnLength,
    reversedColumnLength,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onChangeLabelSize,
    getNumberGridTicks,
    gridDomain,
    limitMinimumCategorySize = false,
    maxLabelSize,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)

  const scalerColumnsGroups = scalerCommonColumnsGroups(
    columnLength,
    gridDomain,
    reversedColumnLength
  )

  useEffect(() => {
    if (isHorizontal && width) {
      getNumberGridTicks(width)
    } else {
      getNumberGridTicks(height)
    }
  }, [isHorizontal, width, height, getNumberGridTicks])

  const renderColumn = (column: ColumnItem | undefined, index: number, isReversed?: boolean) => {
    if (!column) {
      return null
    }

    const sections = getSections({
      sections: column.sections,
      scaler: column.total >= 0 ? scalerMaxValue : scalerMinValue,
    })

    const lengthColumns = !sections[0] || sections[0] === undefined ? 0 : sections[0].length

    return (
      <Column
        key={index}
        group={group}
        total={column.total}
        sections={sections}
        lengthColumns={lengthColumns}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        showValues={showValues}
        activeGroup={activeGroup}
        activeSectionIndex={activeSectionIndex}
        formatValueForLabel={formatValueForLabel}
        onMouseEnterColumn={params => onMouseEnterColumn(group, params)}
        onMouseLeaveColumn={() => onMouseLeaveColumn(group)}
        onChangeLabelSize={onChangeLabelSize}
        maxNumberGroups={maxNumberGroups}
        gridDomain={gridDomain}
        maxLabelSize={maxLabelSize}
      />
    )
  }
  return (
    <div
      className={cnGroup('Groups', { isHorizontal })}
      style={styleGroups(isHorizontal, limitMinimumCategorySize)}
      ref={ref}
    >
      <div className={cnGroup('Columns')}>
        <div
          className={cnGroup('Wrapper')}
          style={styleOrientation(isHorizontal, scalerColumnsGroups, gridDomain, columnLength)}
        >
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        <div
          className={cnGroup('Wrapper')}
          style={styleOrientation(
            isHorizontal,
            scalerColumnsGroups,
            gridDomain,
            reversedColumnLength
          )}
        >
          {reversedColumns.map((column, index) => renderColumn(column, index, true))}
        </div>
      </div>
    </div>
  )
}
