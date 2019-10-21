import * as React from "react";

import Field from "./Field";
import Token from "./Token";
import Grid from "./Grid";

const App: React.FC = () => {
  return (
    <Field>
      <Grid>
        <Token tokenType="x" />
        <Token tokenType="o" />
      </Grid>
    </Field>
  );
};

export default App;
