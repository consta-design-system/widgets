import React from 'react'

import { useComponentSize } from '@consta/uikit/useComponentSize'
import { isDefined, isNotNil } from '@consta/widgets-utils/lib/type-guards'

import { FormatValue } from '@/__private__/types'
import { cn } from '@/__private__/utils/bem'
import { NumberRange } from '@/__private__/utils/scale'
import { isNumber } from '@/__private__/utils/util'

import { Size } from '../helpers'
import { LabelSize } from '../CoreBarChart'
import { styleOrientation } from '../CoreBarChartColumn/helpers'
import { getDirection } from '../CoreBarChartSection/helpers'
import { CoreBarChartSection } from '../CoreBarChartSection/CoreBarChartSection'
import { TooltipData } from '../CoreBarChartTooltip/CoreBarChartTooltip'

import './CoreBarChartColumn.css'

const cnCoreBarChartColumn = cn('CoreBarChartColumn')

export type ColumnSize = Exclude<Size, 'auto'>

export type SectionItem = {
  color: string
  value?: number
  length?: number
  name?: string
  overflowed?: boolean
}

export type ColumnProperty = {
  width: number
  height: number
}

export type OnMouseEnterColumn = (params: TooltipData) => void

export const getColumnCenter = (collection: HTMLCollection | undefined, isHorizontal: boolean) => {
  const children = collection || []
  const { left, top } = children[isHorizontal ? 0 : children.length - 1].getBoundingClientRect()
  const { height, width } = Array.from(children).reduce(
    (prev, element) =>
      isHorizontal
        ? {
            width: prev.width + element.getBoundingClientRect().width,
            height: element.getBoundingClientRect().height,
          }
        : {
            width: element.getBoundingClientRect().width,
            height: prev.height + element.getBoundingClientRect().height,
          },
    { width: 0, height: 0 }
  )

  const x = left + width / 2
  const y = top + height / 2

  return { x, y }
}

type Props = {
  group: string
  total: number
  sections: readonly SectionItem[] | undefined
  showValues: boolean
  isHorizontal: boolean
  clickable: boolean
  lengthColumns?: number
  isReversed?: boolean
  activeGroup?: string
  activeSectionIndex?: number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onMouseClickColumn: React.MouseEventHandler
  onChangeLabelSize?: (size: LabelSize) => void
  maxNumberGroups: number
  gridDomain: NumberRange
}

export const CoreBarChartColumn: React.FC<Props> = ({
  group,
  total,
  sections = [],
  lengthColumns,
  showValues,
  isHorizontal,
  clickable,
  isReversed = false,
  activeGroup,
  activeSectionIndex,
  formatValueForLabel = String,
  onMouseEnterColumn,
  onMouseLeaveColumn,
  onMouseClickColumn,
  onChangeLabelSize,
  maxNumberGroups,
  gridDomain,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)
  const columnProperty: ColumnProperty = { width, height }

  const lengthColumn = lengthColumns ?? 0

  const numberColumnSections = sections?.length ?? 0

  const handleMouseEnter: React.MouseEventHandler = event => {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return
    }

    const { x, y } = getColumnCenter(event.currentTarget.parentElement?.children, isHorizontal)
    const selectedSections = sections.filter(isDefined)

    onMouseEnterColumn({
      x,
      y,
      items: isHorizontal ? selectedSections : [...selectedSections].reverse(),
    })
  }

  const mapSections = (items: readonly SectionItem[] | undefined) => {
    let sectionsLength: number = 0

    return items?.map((item, index) => {
      const secLength = Math.floor(item.length || 0)
      if (index === 0) {
        sectionsLength = secLength

        return {
          ...item,
          overflowed: secLength === 100,
        }
      }

      if (sectionsLength + secLength <= 100) {
        sectionsLength += secLength

        return item
      } else {
        const newSecLength = 100 - sectionsLength
        if (newSecLength >= 0) {
          sectionsLength = 100

          return {
            ...item,
            length: newSecLength,
            overflowed: true,
          }
        }

        return {
          ...item,
          length: 0,
        }
      }
    })
  }

  const renderSection = (item: SectionItem | undefined, index: number) => {
    if (!item || item.length === undefined) {
      return null
    }

    const isLastItem = isReversed ? index === 0 : index === sections.length - 1
    const isColumnLabel =
      (showValues && isLastItem) ||
      (!isReversed && gridDomain[1] < Number(total)) ||
      (isReversed && gridDomain[0] > Number(total))
    const isSectionLabel = isNumber(activeSectionIndex) && activeSectionIndex === index
    const isActive =
      isSectionLabel ||
      (activeGroup && activeGroup === group) ||
      (!activeGroup && !isNumber(activeSectionIndex))

    const getLabel = () => {
      if (isColumnLabel && isNotNil(total)) {
        return formatValueForLabel(total)
      }

      if (isSectionLabel && isNotNil(item.value)) {
        return formatValueForLabel(item.value)
      }
    }

    return (
      <CoreBarChartSection
        color={item.color}
        length={item.length}
        key={index}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        isActive={isActive}
        overflowed={item.overflowed}
        label={getLabel()}
        onChangeLabelSize={onChangeLabelSize}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeaveColumn}
        onMouseClick={onMouseClickColumn}
        columnProperty={columnProperty}
        gridDomain={gridDomain}
        numberColumnSections={numberColumnSections}
        indexSection={index}
      />
    )
  }

  const direction = getDirection(isHorizontal, isReversed)
  const horizontal = !isHorizontal ? 'vertical' : ''

  return (
    <div
      className={cnCoreBarChartColumn('Columns', {
        horizontal,
        direction,
        clickable,
      })}
      style={styleOrientation(lengthColumn, maxNumberGroups, isHorizontal, height)}
      ref={ref}
    >
      {(mapSections(sections) || []).map(renderSection)}
    </div>
  )
}
