import { AnyAction } from "redux";

import { GameState } from "../state";
import { isStartGameAction } from "../actions/start-game";

export default function startGameReducer(
  state: GameState,
  action: AnyAction
): GameState {
  if (!isStartGameAction(action)) {
    return state;
  }

  const { mode } = action.payload;

  return {
    ...state,
    mode
  };
}
