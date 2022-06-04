import * as React from "react";
import { createUseStyles } from "react-jss";

import { useDIDependency } from "@/container";

import { GameService } from "@/services/game/GameService";

import Field from "./Field";

const useStyles = createUseStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {},
});

const Game: React.FC = () => {
  const styles = useStyles();
  const game = useDIDependency(GameService);
  return (
    <div className={styles.root}>
      <Field className={styles.field} field={game.field} />
    </div>
  );
};

export default Game;
