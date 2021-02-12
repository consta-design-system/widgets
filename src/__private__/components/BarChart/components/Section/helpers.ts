import { LabelSize } from '@/__private__/components/BarChart'
import { ColumnProperty } from '@/__private__/components/BarChart/components/Column'

export const getSize = (length: number, isHorizontal: boolean) => {
  const size = `${Math.abs(length)}%`

  return {
    width: isHorizontal ? size : undefined,
    height: isHorizontal ? undefined : size,
  }
}

export const getRoundedBorder = (columnProperty: ColumnProperty, isHorizontal: boolean) => {
  switch (isHorizontal) {
    case false:
      if (columnProperty.width < 8) {
        return { borderRadius: '0' }
      } else if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '1px 1px 0 0' }
      } else {
        return { borderRadius: '2px 2px 0 0' }
      }
    case true:
      if (columnProperty.height < 8) {
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
  isHorizontal: boolean,
  isReversed: boolean,
  maxLabelSize: LabelSize
) => {
  if (!isHorizontal && !isReversed && isOverflow) {
    return {
      border: '6px solid transparent',
      borderBottom: `6px solid ${color}`,
      transform: 'translate(-50%, -280%)',
    }
  }
  if (!isHorizontal && isReversed && isOverflow) {
    return {
      border: '6px solid transparent',
      borderTop: `6px solid ${color}`,
      transform: 'translate(-50%, 300%)',
    }
  }
  if (isHorizontal && !isReversed && isOverflow) {
    return {
      border: '6px solid transparent',
      borderLeft: `6px solid ${color}`,
      margin: `0 -${maxLabelSize.width + 15}px 0 0`,
    }
  }
  if (isHorizontal && isReversed && isOverflow) {
    return {
      border: '6px solid transparent',
      borderRight: `6px solid ${color}`,
      margin: `0 0 0 -${maxLabelSize.width + 15}px`,
    }
  }
}

export const getBackground = (
  color: string,
  length: number,
  isOverflow: boolean,
  isHorizontal: boolean,
  isReversed: boolean
) => {
  if (length === 0) {
    return { background: 'rgba(0,0,0,0)' }
  } else if (!isHorizontal && !isReversed && isOverflow) {
    return {
      background: `linear-gradient(to top, ${color} 95%, rgba(10,165,255,0) 100%)`,
      minHeight: '105%',
    }
  } else if (!isHorizontal && isReversed && isOverflow) {
    return {
      background: `linear-gradient(to bottom, ${color} 95%, rgba(10,165,255,0) 100%)`,
      minHeight: '105%',
    }
  } else if (isHorizontal && !isReversed && isOverflow) {
    return {
      background: `linear-gradient(to right, ${color} 95%, rgba(10,165,255,0) 100%)`,
      minWidth: '105%',
    }
  } else if (isHorizontal && isReversed && isOverflow) {
    return {
      background: `linear-gradient(to left, ${color} 95%, rgba(10,165,255,0) 100%)`,
      minWidth: '105%',
    }
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
