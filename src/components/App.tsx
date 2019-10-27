import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "@/state";
import { windowArray } from "@/utils";
import { TOKENS_PER_GRID } from "@/services/game/consts";

import Field from "./Field";
import Grid from "./Grid";
import PositionedToken from "./PositionedToken";
import ResetButton from "./ResetButton";
import { getTokenIndex } from "@/services/game/state";

const App: React.FC = () => {
  const tokens = useSelector((state: AppState) => state.services.game.tokens);
  const turn = useSelector((state: AppState) => state.services.game.turn);
  const grids = windowArray(tokens, TOKENS_PER_GRID);
  // TODO: cleanup grids.  Draw them in sets of 3
  return (
    <div>
      {grids.map((tokens, gridIndex) => (
        <Field key={gridIndex}>
          <Grid>
            {tokens.map((_, i) => {
              const position = getTokenIndex(gridIndex, i);
              return <PositionedToken key={position} position={position} />;
            })}
          </Grid>
        </Field>
      ))}
      <div>Turn: {turn}</div>
      <ResetButton />
    </div>
  );
};

export default App;
