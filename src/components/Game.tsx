import * as React from "react";
import { useSelector } from "react-redux";

import { windowArray } from "@/utils";
import { TOKENS_PER_GRID } from "@/services/game/consts";

import { getTokenArrayIndex } from "@/services/game/utils";
import { tokensSelector, turnSelector } from "@/services/game/selectors";

import theme from "@/theme/theme";

import Field from "./Field";
import Grid from "./Grid";
import PositionedToken from "./PositionedToken";
import ResetButton from "./ResetButton";

const Game: React.FC = () => {
  const tokens = useSelector(tokensSelector);
  const turn = useSelector(turnSelector);
  const grids = windowArray(tokens, TOKENS_PER_GRID);
  return (
    <div>
      <Field>
        {grids.map((tokens, gridIndex) => {
          const x = gridIndex % 3;
          const y = Math.floor(gridIndex / 3);
          return (
            <Grid
              key={gridIndex}
              x={theme.gridSizePx * x + 20}
              y={theme.gridSizePx * y + 20}
            >
              {tokens.map((_, i) => {
                const position = getTokenArrayIndex(gridIndex, i);
                return <PositionedToken key={position} position={position} />;
              })}
            </Grid>
          );
        })}
      </Field>
      <div>Turn: {turn}</div>
      <ResetButton />
    </div>
  );
};

export default Game;
