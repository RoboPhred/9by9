import * as React from "react";
import { createUseStyles } from "react-jss";

import { useDIDependency } from "@/container";

import Field from "./Field";
import { GameController } from "@/services/game/GameController";

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
  const controller = useDIDependency(GameController);
  React.useEffect(() => {
    controller.startTwoPlayerGame();
  }, []);
  return (
    <div className={styles.root}>
      <Field className={styles.field} field={controller.session.field} />
    </div>
  );
};

export default Game;
