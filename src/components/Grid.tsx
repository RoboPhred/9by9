import * as React from "react";
import { range } from "lodash";

import { TOKENS_PER_GRID } from "@/services/game/consts";
import { getTokenArrayIndex } from "@/services/game/utils";

import GridVisual from "./GridVisual";
import PositionedToken from "./PositionedToken";

export interface GridProps {
  x: number;
  y: number;
  gridIndex: number;
}

const Grid: React.FC<GridProps> = ({ x, y, gridIndex }) => {
  return (
    <GridVisual x={x} y={y}>
      {range(0, TOKENS_PER_GRID).map(gridTokenIndex => {
        const position = getTokenArrayIndex(gridIndex, gridTokenIndex);
        return <PositionedToken key={position} position={position} />;
      })}
    </GridVisual>
  );
};

export default Grid;
