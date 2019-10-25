import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "@/state";

import Field from "./Field";
import Grid from "./Grid";
import PositionedToken from "./PositionedToken";

const App: React.FC = () => {
  const tokens = useSelector((state: AppState) => state.services.game.tokens);
  return (
    <Field>
      <Grid>
        {tokens.map((_, i) => (
          <PositionedToken key={i} position={i} />
        ))}
      </Grid>
    </Field>
  );
};

export default App;
