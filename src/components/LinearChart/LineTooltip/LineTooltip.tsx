import { Position } from '@consta/uikit/Popover';
import { Tooltip } from '@consta/uikit/Tooltip';
import React from 'react';

import { TooltipContentForMultipleValues } from '##/components/TooltipContentForMultipleValues/TooltipContentForMultipleValues';
import { FormatValue } from '##/types';
import { isDefined, isNotNil } from '##/utils/type-guards';
import { isObjectsEqual } from '##/utils/util';

import {
  HoveredDotValue,
  HoveredMainValue,
  Item,
  Line,
  ScaleLinear,
  Threshold,
} from '../LinearChart';

type Props = {
  lines: readonly Line[];
  anchorEl: Element | null;
  scaleX: ScaleLinear;
  scaleY: ScaleLinear;
  hoveredMainValue: HoveredMainValue;
  hoveredDotValue: HoveredDotValue;
  threshold?: Threshold;
  formatValueForLabel: FormatValue;
  formatValueForTooltip?: FormatValue;
  formatValueForTooltipTitle?: FormatValue;
};

type TooltipItem = {
  color?: string;
  name: string;
  value: number | null;
};

export const LineTooltip: React.FC<Props> = (props) => {
  const {
    lines,
    anchorEl,
    scaleX,
    scaleY,
    hoveredMainValue,
    hoveredDotValue,
    threshold,
    formatValueForLabel,
    formatValueForTooltipTitle,
    formatValueForTooltip = String,
  } = props;
  if (!anchorEl || !isNotNil(hoveredMainValue ?? hoveredDotValue)) {
    return null;
  }

  const mainValueKey = 'x';
  const secondaryValueKey = 'y';
  const isItemHovered = (item: Item) =>
    item[mainValueKey] === hoveredMainValue ||
    isObjectsEqual(item, hoveredDotValue);
  const getSecondaryValue = (item?: Item) =>
    item ? item[secondaryValueKey] : null;

  const tooltipLines = isNotNil(hoveredMainValue)
    ? lines
    : lines.filter((line) =>
        line.values.find((item) => isObjectsEqual(item, hoveredDotValue)),
      );

  const tooltipItems: readonly TooltipItem[] = tooltipLines.map((line) => {
    const item = line.values.find(isItemHovered);
    const secondaryValue = getSecondaryValue(item);

    return {
      color: line.color,
      name: line.lineName,
      value: secondaryValue,
    };
  });

  const thresholdItems: readonly TooltipItem[] = threshold
    ? [threshold.max, threshold.min]
        .filter(isDefined)
        .map((thresholdLine, idx) => {
          const item = thresholdLine.values.find(
            (v) => isItemHovered(v) || v.x === hoveredDotValue?.x,
          );
          const defaultName = threshold.min
            ? `${idx === 0 ? 'Верхнее' : 'Нижнее'} пороговое значение`
            : 'Пороговое значение';

          return {
            name: thresholdLine.name || thresholdLine.label || defaultName,
            value: getSecondaryValue(item),
          };
        })
    : [];

  const lineValues = tooltipItems.map((line) => line.value).filter(isNotNil);
  const maxSecondaryValue = lineValues.length
    ? Math.max(...lineValues)
    : undefined;

  const getTooltipPosition = ({
    xValue,
    yValue,
  }: {
    xValue: number | undefined;
    yValue: number | undefined;
  }): Position => {
    const { left, top, width, height } = anchorEl.getBoundingClientRect();

    return {
      // Для пропусков располагаем тултип по центру
      x: left + (isDefined(xValue) ? scaleX(xValue) : width / 2),
      y: top + (isDefined(yValue) ? scaleY(yValue) : height / 2),
    };
  };

  const position = getTooltipPosition({
    xValue: hoveredMainValue ?? hoveredDotValue?.x,
    yValue: isNotNil(hoveredMainValue) ? maxSecondaryValue : hoveredDotValue?.y,
  });

  const title = (formatValueForTooltipTitle || formatValueForLabel)(
    (hoveredMainValue as number) ?? hoveredDotValue?.x,
  );

  return (
    <Tooltip
      size="l"
      position={position}
      direction={isNotNil(hoveredMainValue) ? 'upCenter' : 'rightCenter'}
      isInteractive={false}
    >
      <TooltipContentForMultipleValues
        title={title}
        items={[...tooltipItems, ...thresholdItems].map((item) => ({
          color: item.color,
          name: item.name,
          value: item.value,
        }))}
        formatValueForTooltip={formatValueForTooltip}
      />
    </Tooltip>
  );
};
