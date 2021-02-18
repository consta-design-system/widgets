import { ColumnProperty } from '@/__private__/components/CoreBarChart/Column/Column'
import { LabelSize } from '@/__private__/components/CoreBarChart/CoreBarChart'

export const getSize = (
  length: number,
  isHorizontal: boolean,
  isOverflow: boolean,
  numberColumnSections: number,
  indexSection?: number
) => {
  const size = `${Math.abs(length)}%`
  const sizeOverflow = `${Math.abs(length) + 5}%`

  if (
    isOverflow &&
    indexSection &&
    numberColumnSections === indexSection + 1 &&
    numberColumnSections > 1
  ) {
    return {
      width: isHorizontal ? sizeOverflow : undefined,
      height: isHorizontal ? undefined : sizeOverflow,
      margin: isHorizontal ? '0 -10px 0 0' : '-10px 0 0 0',
    }
  } else {
    return {
      width: isHorizontal ? size : undefined,
      height: isHorizontal ? undefined : size,
    }
  }
}

export const getReversed = (isHorizontal: boolean, isReversed: boolean) => {
  if (isHorizontal && isReversed) {
    return 'isReversedIsHorizontal'
  } else if (!isHorizontal && isReversed) {
    return 'isReversedNotHorizontal'
  } else if (isHorizontal && !isReversed) {
    return 'notReversedIsHorizontal'
  } else {
    return 'notReversedNotHorizontal'
  }
}

export const getRoundedBorder = (
  columnProperty: ColumnProperty,
  reversed: string,
  lastSection: boolean
) => {
  switch (reversed) {
    case 'notReversedNotHorizontal':
      if (columnProperty.width < 8 || !lastSection) {
        return { borderRadius: '0' }
      } else if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '1px 1px 0 0' }
      } else {
        return { borderRadius: '2px 2px 0 0' }
      }
    case 'isReversedNotHorizontal':
      if (columnProperty.width < 8 || !lastSection) {
        return { borderRadius: '0' }
      } else if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '0 0 1px 1px' }
      } else {
        return { borderRadius: '0 0 2px 2px' }
      }
    case 'isReversedIsHorizontal':
      if (columnProperty.height < 8 || !lastSection) {
        return { borderRadius: '0' }
      } else if (columnProperty.height >= 8 && columnProperty.height < 16) {
        return { borderRadius: '1px 0 0 1px' }
      } else {
        return { borderRadius: '2px 0 0 2px' }
      }
    case 'notReversedIsHorizontal':
      if (columnProperty.height < 8 || !lastSection) {
        return { borderRadius: '0' }
      } else if (columnProperty.height >= 8 && columnProperty.height < 16) {
        return { borderRadius: '0 1px 1px 0' }
      } else {
        return { borderRadius: '0 2px 2px 0' }
      }
  }
}

export const getTriangle = (
  color: string,
  isOverflow: boolean,
  reversed: string,
  maxLabelSize: LabelSize,
  lastSection: boolean
) => {
  if (isOverflow && lastSection) {
    switch (reversed) {
      case 'notReversedNotHorizontal':
        return {
          border: '6px solid transparent',
          borderBottom: `6px solid ${color}`,
          transform: 'translate(-50%, -270%)',
        }
      case 'isReversedNotHorizontal':
        return {
          border: '6px solid transparent',
          borderTop: `6px solid ${color}`,
          transform: 'translate(-50%, 290%)',
        }
      case 'notReversedIsHorizontal':
        return {
          border: '6px solid transparent',
          borderLeft: `6px solid ${color}`,
          margin: `0 -${maxLabelSize.width + 15}px 0 0`,
        }
      case 'isReversedIsHorizontal':
        return {
          border: '6px solid transparent',
          borderRight: `6px solid ${color}`,
          margin: `0 0 0 -${maxLabelSize.width + 15}px`,
        }
    }
  }
}

const getBackgroundOverflow = (color: string, reversed: string, numberColumnSections: number) => {
  if (numberColumnSections > 1) {
    switch (reversed) {
      case 'notReversedNotHorizontal':
        return { background: `linear-gradient(to top, ${color} 75%, rgba(10,165,255,0) 100%)` }
      case 'isReversedNotHorizontal':
        return { background: `linear-gradient(to bottom, ${color} 75%, rgba(10,165,255,0) 100%)` }
      case 'notReversedIsHorizontal':
        return { background: `linear-gradient(to right, ${color} 75%, rgba(10,165,255,0) 100%)` }
      case 'isReversedIsHorizontal':
        return { background: `linear-gradient(to left, ${color} 75%, rgba(10,165,255,0) 100%)` }
    }
  } else {
    switch (reversed) {
      case 'notReversedNotHorizontal':
        return { background: `linear-gradient(to top, ${color} 95%, rgba(10,165,255,0) 100%)` }
      case 'isReversedNotHorizontal':
        return { background: `linear-gradient(to bottom, ${color} 95%, rgba(10,165,255,0) 100%)` }
      case 'notReversedIsHorizontal':
        return { background: `linear-gradient(to right, ${color} 95%, rgba(10,165,255,0) 100%)` }
      case 'isReversedIsHorizontal':
        return { background: `linear-gradient(to left, ${color} 95%, rgba(10,165,255,0) 100%)` }
    }
  }
}

export const getBackground = (
  color: string,
  length: number,
  isOverflow: boolean,
  lastSection: boolean,
  reversed: string,
  numberColumnSections: number
) => {
  if (length === 0) {
    return { background: 'rgba(0,0,0,0)' }
  } else if (isOverflow && lastSection) {
    return getBackgroundOverflow(color, reversed, numberColumnSections)
  } else {
    return { background: `${color}` }
  }
}

export const getColor = (color: string, isOverflow: boolean) => {
  if (isOverflow) {
    return { color: `${color}` }
  } else {
    return { color: 'var(--color-bg-soft)' }
  }
}
