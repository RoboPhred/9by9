import * as React from "react";
import { range } from "lodash";

import GridVisual from "./GridVisual";
import GridSlot from "./GridSlot";
import { GameGrid } from "@/services/game/GameGrid";

export interface GridProps {
  grid: GameGrid;
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  const slots = grid.slots;
  return (
    <GridVisual>
      {slots.map((slot, slotIndex) => {
        return <GridSlot key={slotIndex} slot={slot} />;
      })}
    </GridVisual>
  );
};

export default Grid;
