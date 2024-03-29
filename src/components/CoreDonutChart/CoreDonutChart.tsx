import './CoreDonutChart.css';

import { Position } from '@consta/uikit/Popover';
import { Tooltip } from '@consta/uikit/Tooltip';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { PieArcDatum } from 'd3-shape';
import React, {
  CSSProperties,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TooltipContentForMultipleValues } from '##/components/TooltipContentForMultipleValues/TooltipContentForMultipleValues';
import { FormatValue } from '##/types';
import { cn } from '##/utils/bem';
import { numberFormatter } from '##/utils/formatters';
import { isDefined } from '##/utils/type-guards';

import { CoreDonutChartLabels } from './CoreDonutChartLabels/CoreDonutChartLabels';
import {
  CoreDonutChartPie,
  HandlerClickArc,
  HandlerClickPie,
} from './CoreDonutChartPie/CoreDonutChartPie';
import { CoreDonutChartText } from './CoreDonutChartText/CoreDonutChartText';
import {
  ArcDataItem,
  ArcLabelSize,
  DEFAULT_SVG_OFFSET,
  defaultFormatArcLabel,
  defaultGetCirclesCount,
  defaultGetMinChartSize,
  defaultSortValue,
  DonutDataItem,
  getArcRadiuses,
  getChartSize,
  GetCirclesCount,
  getDonutMaxMinSizeRect,
  getGroupTransformTranslate,
  getMainRadius,
  GetMinChartSize,
  getPieData,
  getRenderArc,
  getSizeDonut,
  getSvgOffset,
  getSvgSize,
  getValues,
  HalfDonut,
  LimitSizeSide,
  SortValue,
  SvgOffset,
} from './helpers';

const cnCoreDonutChart = cn('CoreDonutChart');

type TooltipDataState = ReadonlyArray<{
  value: number | null;
  color: string;
  name: string;
}>;

export type Props = {
  data: readonly DonutDataItem[];
  showTooltip: boolean;
  value?: string;
  label?: string;
  halfDonut?: HalfDonut;
  limitSizeSide?: LimitSizeSide;
  showArcLabels?: boolean;
  arcLabelSize?: ArcLabelSize;
  sortValue?: SortValue | null;
  getCirclesCount?: GetCirclesCount;
  getMinChartSize?: GetMinChartSize;
  formatValue?: (value: string) => string;
  formatLabel?: (label: string) => string;
  formatValueForTooltip?: FormatValue;
  formatArcLabel?: (item: ArcDataItem) => string;
  filterTooltipItem?: (itemData: ArcDataItem) => boolean;
  onClick?: MouseEventHandler;
  onClickPie?: HandlerClickPie;
  onClickArc?: HandlerClickArc;
};

export const CoreDonutChart: React.FC<Props> = ({
  data = [],
  showTooltip,
  halfDonut,
  value,
  label,
  showArcLabels,
  limitSizeSide,
  arcLabelSize = 's',
  sortValue = defaultSortValue,
  getCirclesCount = defaultGetCirclesCount,
  getMinChartSize = defaultGetMinChartSize,
  formatValue = numberFormatter,
  formatLabel = numberFormatter,
  formatValueForTooltip,
  formatArcLabel = defaultFormatArcLabel,
  filterTooltipItem = () => true,
  onClick,
  onClickPie,
  onClickArc,
}) => {
  const [tooltipData, changeTooltipData] = useState<TooltipDataState>([]);
  const [mousePosition, changeMousePosition] = useState<Position>();
  const ref = useRef<HTMLDivElement>(null);
  const arcsRef = useRef<SVGGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const { width, height } = useComponentSize(ref);
  const [svgOffset, setSvgOffset] = useState<SvgOffset>(DEFAULT_SVG_OFFSET);

  const size = width && height ? getChartSize({ width, height, halfDonut }) : 0;
  const mainRadius = getMainRadius({ width, height, svgOffset, halfDonut });
  const mainDiameter = mainRadius * 2;
  const circlesCount = getCirclesCount(data);
  const showText = isDefined(value) || isDefined(label);
  const sizeDonut = getSizeDonut(circlesCount, mainDiameter);
  const minChartSize = getMinChartSize(circlesCount, showText, halfDonut);
  const isTooltipVisible = Boolean(tooltipData.length);
  const arcRadiuses = getArcRadiuses({
    mainRadius,
    circlesCount,
    sizeDonut,
    chartSize: size,
  });
  const values = useMemo(
    () => getValues({ data, circlesCount, sortValue }),
    [data, circlesCount, sortValue],
  );
  const isTextVisible = values.length === 1 && showText;
  const isArcLabelsVisible = values.length === 1 && showArcLabels;
  const piesData = useMemo(
    () => values.map((item) => getPieData(item, halfDonut)),
    [values, halfDonut],
  );
  const rendersArc = arcRadiuses.map(getRenderArc);
  const translate = getGroupTransformTranslate({
    halfDonut,
    radius: mainRadius,
    svgOffset,
  });
  const svgSize = getSvgSize({
    diameter: mainDiameter,
    radius: mainRadius,
    svgOffset,
    halfDonut,
  });
  const labelsPieData = useMemo(
    () => (showArcLabels ? piesData[0] : []),
    [piesData, showArcLabels],
  );

  /**
   * Необходимо рассчитывать размер отступа каждый раз при изменениях виджета,
   * в самом перерасчете применяются методы которые не позволят лишний раз
   * менять состояние компонента, например округление значений расчетов до
   * целых и проверка того что значения не равны предыдущим.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!arcsRef.current || !labelsRef.current) {
      return;
    }

    const nextSvgOffset = getSvgOffset({
      arcsRect: arcsRef.current.getBBox(),
      labelsRect: labelsRef.current.getBBox(),
    });

    if (
      nextSvgOffset.top !== svgOffset.top ||
      nextSvgOffset.right !== svgOffset.right ||
      nextSvgOffset.bottom !== svgOffset.bottom ||
      nextSvgOffset.left !== svgOffset.left
    ) {
      setSvgOffset(nextSvgOffset);
    }
  });

  const handleMouseOver = showTooltip
    ? (d: ReadonlyArray<PieArcDatum<ArcDataItem>>) => {
        changeTooltipData(
          d
            .filter((item) => filterTooltipItem(item.data))
            .map((item) => item.data),
        );
      }
    : () => null;

  const handleMouseOut = () => {
    changeTooltipData([]);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    changeMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const mainStyle: CSSProperties = {
    ...getDonutMaxMinSizeRect({
      width,
      height,
      minChartSize,
      svgOffset,
      halfDonut,
      limitSizeSide,
    }),
  };

  const textStyle =
    isTextVisible && showText
      ? {
          top: halfDonut === 'top' ? 0 : svgOffset.top + sizeDonut,
          right: halfDonut === 'right' ? 0 : svgOffset.right + sizeDonut,
          bottom: halfDonut === 'bottom' ? 0 : svgOffset.bottom + sizeDonut,
          left: halfDonut === 'left' ? 0 : svgOffset.left + sizeDonut,
        }
      : undefined;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className={cnCoreDonutChart()}
      style={mainStyle}
      onClick={onClick}
    >
      {isTooltipVisible && (
        <Tooltip size="m" position={mousePosition} isInteractive={false}>
          <TooltipContentForMultipleValues
            items={tooltipData}
            formatValueForTooltip={formatValueForTooltip}
          />
        </Tooltip>
      )}
      {isTextVisible && showText && (
        <CoreDonutChartText
          className={cnCoreDonutChart('Text', { half: halfDonut ?? 'none' })}
          value={value ? formatValue(value) : value}
          label={label ? formatLabel(label) : label}
          radius={arcRadiuses[0].inner}
          halfDonut={halfDonut}
          lineWidth={sizeDonut}
          style={textStyle}
        />
      )}
      <svg
        className={cnCoreDonutChart('Graph', { half: halfDonut ?? 'none' })}
        width={svgSize.width}
        height={svgSize.height}
        onMouseMove={handleMouseMove}
      >
        <g transform={translate}>
          {piesData.map((pieData, index) => (
            <CoreDonutChartPie
              ref={index === 0 ? arcsRef : undefined}
              key={index}
              data={pieData}
              renderArc={rendersArc[index]}
              isTransparent={isTooltipVisible}
              halfDonut={halfDonut}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClickPie={onClickPie}
              onClickArc={onClickArc}
            />
          ))}
        </g>
        {isArcLabelsVisible && (
          <CoreDonutChartLabels
            ref={labelsRef}
            data={labelsPieData}
            radius={mainRadius}
            size={arcLabelSize}
            halfDonut={halfDonut}
            transform={translate}
            formatArcLabel={formatArcLabel}
          />
        )}
      </svg>
    </div>
  );
};
