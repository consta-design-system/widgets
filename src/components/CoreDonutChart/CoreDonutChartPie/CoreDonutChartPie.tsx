import './CoreDonutChartPie.css';

import { Arc, PieArcDatum } from 'd3-shape';
import React, { forwardRef, SVGAttributes } from 'react';

import { cn } from '##/utils/bem';

import {
  ArcDataItem,
  EMPTY_PIE_ARC_DATUM,
  getArcAnglesByHalfDonut,
  HalfDonut,
  isEmptyPieArcDatum,
} from '../helpers';

const cnCoreDonutChartPie = cn('CoreDonutChartPie');

type MainElementProps = Omit<
  SVGAttributes<SVGGElement>,
  'onClick' | 'onMouseOver'
>;

export type HandlerClickPie = (items: readonly ArcDataItem[]) => void;
export type HandlerClickArc = (item: ArcDataItem) => void;

type Props = MainElementProps & {
  data: ReadonlyArray<PieArcDatum<ArcDataItem>>;
  renderArc: Arc<unknown, PieArcDatum<ArcDataItem>>;
  isTransparent: boolean;
  halfDonut?: HalfDonut;
  onClickPie?: HandlerClickPie;
  onClickArc?: HandlerClickArc;
  onMouseOver: (data: ReadonlyArray<PieArcDatum<ArcDataItem>>) => void;
};

const renderPath = ({
  renderArc,
  item,
  idx,
  onClick,
}: {
  renderArc: Arc<unknown, PieArcDatum<ArcDataItem>>;
  item: PieArcDatum<ArcDataItem>;
  idx?: number;
  onClick?: () => void;
}) => {
  return (
    <path
      key={idx}
      d={renderArc(item) || undefined}
      fill={item.data.color}
      onClick={onClick}
    />
  );
};

export const CoreDonutChartPie = forwardRef<SVGGElement, Props>(
  (props, ref) => {
    const {
      data,
      renderArc,
      isTransparent,
      halfDonut,
      onClickPie,
      onClickArc,
      onMouseOver,
      ...mainElementProps
    } = props;

    const handleClickPie = () => {
      if (!onClickPie) {
        return;
      }

      onClickPie(data.map((item) => item.data));
    };

    return (
      <g
        {...mainElementProps}
        ref={ref}
        className={cnCoreDonutChartPie({ isTransparent })}
        onClick={handleClickPie}
        onMouseOver={() => onMouseOver(data)}
      >
        {isEmptyPieArcDatum(data)
          ? renderPath({
              renderArc,
              item: {
                ...EMPTY_PIE_ARC_DATUM,
                ...getArcAnglesByHalfDonut(halfDonut),
              },
            })
          : data.map((item, idx) =>
              renderPath({
                renderArc,
                item,
                idx,
                onClick: onClickArc ? () => onClickArc(item.data) : undefined,
              }),
            )}
      </g>
    );
  },
);
