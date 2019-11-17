import * as React from "react";
import { useSelector } from "react-redux";
import { range } from "lodash";

import { GRIDS } from "@/services/game/consts";
import { turnSelector } from "@/services/game/selectors";

import theme from "@/theme/theme";

import Field from "./Field";
import Grid from "./Grid";
import ResetButton from "./ResetButton";

const Game: React.FC = () => {
  const turn = useSelector(turnSelector);
  return (
    <div>
      <Field>
        {range(0, GRIDS).map(gridIndex => {
          const x = gridIndex % 3;
          const y = Math.floor(gridIndex / 3);
          return (
            <Grid
              key={gridIndex}
              gridIndex={gridIndex}
              x={theme.gridSizePx * x + 20}
              y={theme.gridSizePx * y + 20}
            />
          );
        })}
      </Field>
      <div>Turn: {turn}</div>
      <ResetButton />
    </div>
  );
};

export default Game;
