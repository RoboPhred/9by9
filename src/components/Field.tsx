import * as React from "react";

import theme from "@/theme/theme";

import { GameField } from "@/services/game/GameField";

import Grid from "./Grid";

interface FieldProps {
  className?: string;
  field: GameField;
}

const Field = ({ className, field }: FieldProps) => {
  const grids = field.grids;
  return (
    <svg
      className={className}
      width={theme.gridSizePx * 3 + 50}
      height={theme.gridSizePx * 3 + 50}
    >
      {grids.map((grid, gridIndex) => {
        const x = gridIndex % 3;
        const y = Math.floor(gridIndex / 3);
        return (
          <g
            transform={`translate(${theme.gridSizePx * x + 20}, ${
              theme.gridSizePx * y + 20
            })`}
          >
            <Grid key={gridIndex} grid={grid} />
          </g>
        );
      })}
    </svg>
  );
};

export default Field;
