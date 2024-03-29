import { ColumnProperty } from '##/components/CoreBarChart/CoreBarChartColumn/CoreBarChartColumn';

export const getSize = (
  length: number,
  isHorizontal: boolean,
  isOverflow: boolean,
  numberColumnSections: number,
  indexSection?: number,
) => {
  const size = `${Math.abs(length)}%`;
  const sizeOverflow = `${Math.abs(length) + 5}%`;

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
    };
  }
  return {
    width: isHorizontal ? size : undefined,
    height: isHorizontal ? undefined : size,
  };
};

export const getDirection = (isHorizontal: boolean, isReversed: boolean) => {
  if (isHorizontal && isReversed) {
    return 'horizontalReverse';
  }
  if (!isHorizontal && isReversed) {
    return 'verticalReverse';
  }
  if (isHorizontal && !isReversed) {
    return 'horizontal';
  }
  return 'vertical';
};

export const getRoundedBorder = (
  columnProperty: ColumnProperty,
  direction: string,
  lastSection: boolean,
) => {
  switch (direction) {
    case 'vertical':
      if (columnProperty.width < 8 || !lastSection) {
        return { borderRadius: '0' };
      }
      if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '1px 1px 0 0' };
      }
      return { borderRadius: '2px 2px 0 0' };

    case 'verticalReverse':
      if (columnProperty.width < 8 || !lastSection) {
        return { borderRadius: '0' };
      }
      if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '0 0 1px 1px' };
      }
      return { borderRadius: '0 0 2px 2px' };

    case 'horizontalReverse':
      if (columnProperty.height < 8 || !lastSection) {
        return { borderRadius: '0' };
      }
      if (columnProperty.height >= 8 && columnProperty.height < 16) {
        return { borderRadius: '1px 0 0 1px' };
      }
      return { borderRadius: '2px 0 0 2px' };

    case 'horizontal':
      if (columnProperty.height < 8 || !lastSection) {
        return { borderRadius: '0' };
      }
      if (columnProperty.height >= 8 && columnProperty.height < 16) {
        return { borderRadius: '0 1px 1px 0' };
      }
      return { borderRadius: '0 2px 2px 0' };
  }
};

export const getTriangle = (
  isOverflow: boolean,
  direction: string,
  labelWidth: number | null,
  lastSection: boolean,
) => {
  if (isOverflow && lastSection && labelWidth) {
    switch (direction) {
      case 'horizontal':
        return {
          margin: `0 -${labelWidth + 10}px 0 0`,
        };
      case 'horizontalReverse':
        return {
          margin: `0 0 0 -${labelWidth + 10}px`,
        };
    }
  }
};

const getBackgroundOverflow = (
  color: string,
  direction: string,
  gradientLength: number,
) => {
  switch (direction) {
    case 'vertical':
      return {
        background: `linear-gradient(to top, ${color} ${
          100 - gradientLength
        }%, rgba(10,165,255,0) 100%)`,
      };
    case 'verticalReverse':
      return {
        background: `linear-gradient(to bottom, ${color} ${
          100 - gradientLength
        }%, rgba(10,165,255,0) 100%)`,
      };
    case 'horizontal':
      return {
        background: `linear-gradient(to right, ${color} ${
          100 - gradientLength
        }%, rgba(10,165,255,0) 100%)`,
      };
    case 'horizontalReverse':
      return {
        background: `linear-gradient(to left, ${color} ${
          100 - gradientLength
        }%, rgba(10,165,255,0) 100%)`,
      };
  }
};

export const getBackground = (
  color: string,
  length: number,
  direction: string,
  gradientLength: number,
  isSectionOverflow?: boolean,
) => {
  if (length === 0) {
    return { background: 'rgba(0,0,0,0)' };
  }
  if (isSectionOverflow) {
    return getBackgroundOverflow(color, direction, gradientLength);
  }
  return { background: `${color}` };
};

export const getShadow = (direction: string) => {
  switch (direction) {
    case 'vertical':
      return {
        top: 0,
        width: '100%',
        height: 'var(--space-m)',
        background:
          'linear-gradient(180deg, rgba(var(--color-nums-shadow), 0.5), transparent)',
      };
    case 'horizontal':
      return {
        right: 0,
        height: '100%',
        width: 'var(--space-m)',
        background:
          'linear-gradient(270deg, rgba(var(--color-nums-shadow), 0.5), transparent)',
      };
  }
};

export const getColor = (color: string, isOverflow: boolean) => {
  if (isOverflow) {
    return { color: `${color}` };
  }
  return { color: 'var(--color-bg-soft)' };
};
