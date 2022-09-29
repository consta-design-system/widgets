import { createArrayOfIndexes } from '@consta/widgets-utils/lib/array';
import { arc, pie, PieArcDatum } from 'd3-shape';
import { CSSProperties } from 'react';

import { isNotNil } from '##/utils/type-guards';

export const halvesDonut = ['top', 'right', 'bottom', 'left'] as const;
export type HalfDonut = typeof halvesDonut[number];

export type DonutDataItem = {
  name: string;
  color: string;
  values: ReadonlyArray<number | null>;
};

export type ArcDataItem = {
  value: number | null;
  color: string;
  name: string;
};

export const arcLabelSizes = ['xs', 's'] as const;
export type ArcLabelSize = typeof arcLabelSizes[number];

export type SvgOffset = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type SortValue = (prev: ArcDataItem, next: ArcDataItem) => number;

export type LimitSizeSide = 'width' | 'height';
export type FormatArcLabel = (item: ArcDataItem) => string;

export type ArcRadius = {
  inner: number;
  outer: number;
};

export const MIN_RADIUS = 50;
export const MAX_CIRCLES_TO_RENDER = 3;
export const LABEL_LINE_WIDTH = 16;
export const LABEL_LINE_OFFSET = 4;
export const DEFAULT_SVG_OFFSET: SvgOffset = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * Отступ между D3.arc элементами, указывается в пикселях.
 */
export const ARC_PAD = 1;
export const ARC_RADIUS = 100;
export const ARC_FULL_ANGLE = {
  startAngle: 0,
  endAngle: 2 * Math.PI,
};

export const EMPTY_PIE_ARC_DATUM: PieArcDatum<ArcDataItem> = {
  data: {
    color: 'var(--color-bg-ghost)',
    name: '',
    value: null,
  },
  endAngle: 0,
  index: 0,
  padAngle: 0,
  startAngle: 0,
  value: 0,
};

export const donutSizeInPercent: Record<number, number> = {
  1: 0.12,
  2: 0.1,
  3: 0.08,
};

export const paddingBetweenDonutsInPercent: Record<number, number> = {
  1: 0,
  2: 0.08,
  3: 0.06,
};

export type GetCirclesCount = (data: readonly DonutDataItem[]) => number;

export type GetMinChartSize = (
  circlesCount: number,
  isExistTextData?: boolean,
  halfDonut?: HalfDonut,
) => number;

export const isHalfDonutHorizontal = (halfDonut?: HalfDonut) => {
  return halfDonut === 'top' || halfDonut === 'bottom';
};

export const isHalfDonutVertical = (halfDonut?: HalfDonut) => {
  return halfDonut === 'right' || halfDonut === 'left';
};

export const getPadding = (circlesCount: number, chartSize: number) => {
  return chartSize * paddingBetweenDonutsInPercent[circlesCount];
};

export const getChartSize = ({
  width,
  height,
  halfDonut,
}: {
  width: number;
  height: number;
  halfDonut?: HalfDonut;
}) => {
  if (isHalfDonutHorizontal(halfDonut)) {
    return Math.min(width, height * 2);
  }

  if (isHalfDonutVertical(halfDonut)) {
    return Math.min(width * 2, height);
  }

  return Math.min(width, height);
};

export const getSizeDonut = (circlesCount: number, chartSize: number) => {
  return chartSize * donutSizeInPercent[circlesCount];
};

export const getDonutRadius = ({
  mainRadius,
  index,
  circlesCount,
  chartSize,
}: {
  mainRadius: number;
  index: number;
  circlesCount: number;
  chartSize: number;
}) => {
  return (
    mainRadius -
    (getSizeDonut(circlesCount, chartSize) +
      getPadding(circlesCount, chartSize)) *
      index
  );
};

export const defaultGetCirclesCount: GetCirclesCount = (data) => {
  if (!data.length) {
    return 0;
  }

  return Math.min(
    Math.max(...data.map((i) => i.values.length)),
    MAX_CIRCLES_TO_RENDER,
  );
};

export const defaultGetMinChartSize: GetMinChartSize = () => {
  return 100;
};

export const getArcAnglesByHalfDonut = (halfDonut?: HalfDonut) => {
  switch (halfDonut) {
    case 'top': {
      return {
        startAngle: Math.PI * 1.5,
        endAngle: Math.PI * 0.5,
      };
    }
    case 'right': {
      return {
        startAngle: 2 * Math.PI,
        endAngle: Math.PI,
      };
    }
    case 'bottom': {
      return {
        startAngle: Math.PI * -0.5,
        endAngle: Math.PI * 0.5,
      };
    }
    case 'left': {
      return {
        startAngle: 0,
        endAngle: Math.PI,
      };
    }
    default: {
      return ARC_FULL_ANGLE;
    }
  }
};

type GetArcRadiusesParams = {
  mainRadius: number;
  circlesCount: number;
  sizeDonut: number;
  chartSize: number;
};

export const getArcRadiuses = (
  params: GetArcRadiusesParams,
): readonly ArcRadius[] => {
  return createArrayOfIndexes(params.circlesCount).map((index) => {
    const outer = getDonutRadius({
      index,
      chartSize: params.chartSize,
      circlesCount: params.circlesCount,
      mainRadius: params.mainRadius,
    });
    const inner = outer - params.sizeDonut;

    return { outer, inner };
  });
};

export const getPieData = (
  data: readonly ArcDataItem[],
  halfDonut?: HalfDonut,
) => {
  const { startAngle, endAngle } = getArcAnglesByHalfDonut(halfDonut);

  const dataGenerator = pie<ArcDataItem>()
    .sort(null)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .value((item) => item.value ?? 0);

  return dataGenerator([...data]);
};

export const getRenderArc = (radius: ArcRadius) => {
  return (
    arc<unknown, PieArcDatum<ArcDataItem>>()
      .innerRadius(radius.inner)
      .outerRadius(radius.outer)
      /**
       * padAngle для каждого D3.arc расчитывается по формуле:
       *
       * `padRadius * [переданное значение]`
       *
       * https://github.com/d3/d3-shape#arc_padAngle
       */
      .padAngle(ARC_PAD / ARC_RADIUS)
      /**
       * Указывается специфичный радиус для правильного расчета `padAngle`, если
       * не указать значение или указать `null`, то расчет этого параметра
       * производится по формуле:
       *
       * `sqrt(innerRadius * innerRadius + outerRadius * outerRadius)`
       *
       * Т.е. для каждого вложенного компонента Donut, размер отступа будет меньше
       * чем у предыдущего, чтобы это исправить указываем фиксированное значение
       * которое исправляет расчеты.
       *
       * https://github.com/d3/d3-shape#arc_padRadius
       */
      .padRadius(ARC_RADIUS)
  );
};

export const isEmptyPieArcDatum = (
  value: ReadonlyArray<PieArcDatum<ArcDataItem>>,
) => {
  return value.every((item) => item.value === 0);
};

type GetValuesParams = {
  data: readonly DonutDataItem[];
  circlesCount: number;
  sortValue?: SortValue | null;
};

export const getValues = ({
  circlesCount,
  data,
  sortValue,
}: GetValuesParams) => {
  const indexes = createArrayOfIndexes(circlesCount);

  const arraysOfDataItems = data.map((item) =>
    indexes.map((_, index) => ({
      color: item.color,
      name: item.name,
      value: item.values[index] ?? null,
    })),
  );

  return indexes.map((_, index) =>
    arraysOfDataItems
      .map((dataItems) => dataItems[index])
      .sort((prev, next) => (sortValue ? sortValue(prev, next) : 0)),
  );
};

export const defaultSortValue: SortValue = (prev, next) => {
  if (!isNotNil(prev.value) || !isNotNil(next.value)) {
    return 0;
  }

  return next.value - prev.value;
};

type GetSizeRectParams = {
  width: number;
  height: number;
  minChartSize: number;
  svgOffset: SvgOffset;
  halfDonut?: HalfDonut;
  limitSizeSide?: LimitSizeSide;
};

const getDonutMaxWidth = ({
  svgOffset,
  height,
  halfDonut,
}: {
  svgOffset: SvgOffset;
  height: number;
  halfDonut?: HalfDonut;
  limitSizeSide?: LimitSizeSide;
}) => {
  const computedHeight =
    height -
    svgOffset.top -
    svgOffset.bottom +
    svgOffset.right +
    svgOffset.left;

  if (isHalfDonutVertical(halfDonut)) {
    return computedHeight / 2;
  }

  return computedHeight;
};

const getDonutMaxHeight = ({
  svgOffset,
  width,
  halfDonut,
}: {
  svgOffset: SvgOffset;
  width: number;
  halfDonut?: HalfDonut;
}) => {
  const computedWidth =
    width - svgOffset.right - svgOffset.left + svgOffset.top + svgOffset.bottom;

  if (isHalfDonutHorizontal(halfDonut)) {
    return computedWidth / 2;
  }

  if (isHalfDonutVertical(halfDonut)) {
    return computedWidth * 2;
  }

  return computedWidth;
};

export const getDonutMaxMinSizeRect = ({
  width,
  height,
  minChartSize,
  svgOffset,
  halfDonut,
  limitSizeSide,
}: GetSizeRectParams): CSSProperties => {
  const computedWidth = isHalfDonutVertical(halfDonut)
    ? minChartSize / 2
    : minChartSize;
  const computedHeight = isHalfDonutHorizontal(halfDonut)
    ? minChartSize / 2
    : minChartSize;
  const minWidth = computedWidth + svgOffset.right + svgOffset.left;
  const maxWidth =
    limitSizeSide === 'width' && height !== 0 && width !== 0
      ? getDonutMaxWidth({ svgOffset, height, halfDonut, limitSizeSide })
      : undefined;
  const minHeight = computedHeight + svgOffset.top + svgOffset.bottom;
  const maxHeight =
    limitSizeSide === 'height' && height !== 0 && width !== 0
      ? getDonutMaxHeight({ svgOffset, width, halfDonut })
      : undefined;

  return {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  };
};

export const getSvgTextDY = (deg: number) => {
  if (deg > 120 && deg < 240) {
    return '1em';
  }

  if ((deg > 60 && deg < 120) || (deg > 240 && deg < 300)) {
    return '0.35em';
  }

  return '-0.35em';
};

export const radianToDegree = (radian: number) => {
  const degrees = Math.round(radian * (180 / Math.PI));
  return degrees > 0 ? degrees : 360 - Math.abs(degrees);
};

export const getArcMiddleInRadian = ({
  startAngle,
  endAngle,
}: Pick<PieArcDatum<ArcDataItem>, 'startAngle' | 'endAngle'>) => {
  return startAngle + (endAngle - startAngle) / 2;
};

export const getSvgTextAnchor = (deg: number, halfDonut?: HalfDonut) => {
  if (halfDonut === 'left' || (deg > 20 && deg < 160)) {
    return 'start';
  }

  if (halfDonut === 'right' || (deg > 200 && deg < 340)) {
    return 'end';
  }

  return 'middle';
};

type GetGroupTransformTranslate = {
  radius: number;
  svgOffset: SvgOffset;
  halfDonut?: HalfDonut;
};

export const getGroupTransformTranslate = ({
  halfDonut,
  radius,
  svgOffset,
}: GetGroupTransformTranslate) => {
  if (halfDonut === 'top') {
    return `translate(${radius + svgOffset.left}, 0)`;
  }

  if (halfDonut === 'right') {
    return `translate(${radius + svgOffset.left}, ${radius + svgOffset.top})`;
  }

  if (halfDonut === 'bottom') {
    return `translate(${radius + svgOffset.left}, ${radius + svgOffset.top})`;
  }

  if (halfDonut === 'left') {
    return `translate(0, ${radius + svgOffset.top})`;
  }

  return `translate(${radius + svgOffset.left}, ${radius + svgOffset.top})`;
};

type SvgOffsetDOMRect = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>;
type GetSvgOffset = {
  arcsRect: SvgOffsetDOMRect;
  labelsRect: SvgOffsetDOMRect;
};

export const getSvgOffset = ({ arcsRect, labelsRect }: GetSvgOffset) => {
  const offsetTop =
    labelsRect.y < arcsRect.y
      ? Math.round(Math.abs(labelsRect.y - arcsRect.y))
      : 0;
  const offsetLeft =
    labelsRect.x < arcsRect.x
      ? Math.round(Math.abs(labelsRect.x - arcsRect.x))
      : 0;
  const offsetRight =
    arcsRect.width + arcsRect.x < labelsRect.width + labelsRect.x
      ? Math.round(
          labelsRect.width + labelsRect.x - (arcsRect.width + arcsRect.x),
        )
      : 0;
  const offsetBottom =
    arcsRect.height + arcsRect.y < labelsRect.height + labelsRect.y
      ? Math.round(
          labelsRect.height + labelsRect.y - (arcsRect.height + arcsRect.y),
        )
      : 0;
  const verticalOffset = Math.max(offsetRight, offsetLeft);
  const horizontalOffset = Math.max(offsetTop, offsetBottom);

  return {
    top: horizontalOffset,
    right: verticalOffset,
    bottom: horizontalOffset,
    left: verticalOffset,
  };
};

type GetSvgSize = {
  diameter: number;
  radius: number;
  svgOffset: SvgOffset;
  halfDonut?: HalfDonut;
};

export const getSvgSize = ({
  diameter,
  radius,
  svgOffset,
  halfDonut,
}: GetSvgSize) => {
  const computedWidth = isHalfDonutVertical(halfDonut) ? radius : diameter;
  const computedHeight = isHalfDonutHorizontal(halfDonut) ? radius : diameter;

  return {
    width: computedWidth + svgOffset.right + svgOffset.left,
    height: computedHeight + svgOffset.top + svgOffset.bottom,
  };
};

type GetMainRadius = {
  width: number;
  height: number;
  svgOffset: SvgOffset;
  halfDonut?: HalfDonut;
};

export const getMainRadius = ({
  width,
  height,
  svgOffset,
  halfDonut,
}: GetMainRadius) => {
  if (width === 0 || height === 0) {
    return 0;
  }

  const widthDivider = isHalfDonutVertical(halfDonut) ? 1 : 2;
  const heightDivider = isHalfDonutHorizontal(halfDonut) ? 1 : 2;

  return Math.max(
    Math.min(
      Math.floor((width - svgOffset.right - svgOffset.left) / widthDivider),
      Math.floor((height - svgOffset.top - svgOffset.bottom) / heightDivider),
    ),
    MIN_RADIUS,
  );
};

type GetRendersLabelsParams = {
  radius: number;
  lineWidth: number;
  labelOffset: number;
};

export const getRendersLabels = ({
  radius,
  lineWidth,
  labelOffset,
}: GetRendersLabelsParams) => {
  const endLineRadius = radius + lineWidth;
  const startLabelRadius = endLineRadius + labelOffset;

  return {
    startLine: getRenderArc({ inner: radius, outer: radius }).centroid,
    endLine: getRenderArc({ inner: endLineRadius, outer: endLineRadius })
      .centroid,
    startLabel: getRenderArc({
      inner: startLabelRadius,
      outer: startLabelRadius,
    }).centroid,
  };
};

export const cropArcLabel = (value: string) => {
  return value.length <= 20 ? value : `${value.slice(0, 20)}…`;
};

export const defaultFormatArcLabel: FormatArcLabel = (item) => {
  return item.name;
};
