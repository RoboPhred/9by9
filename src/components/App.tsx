import * as React from "react";
import { useSelector } from "react-redux";

import { modeSelector } from "@/services/game/selectors";

import Game from "./Game";
import ModeSelect from "./ModeSelect";

const App: React.FC = () => {
  const mode = useSelector(modeSelector);
  if (mode == null) {
    return <ModeSelect />;
  }
  return <Game />;
};

export default App;
