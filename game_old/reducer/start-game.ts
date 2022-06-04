import { AnyAction } from "redux";

import { GameState } from "../state";
import { isStartGameAction } from "../actions/start-game";
import { performAiMove } from "./ai-move";

export default function startGameReducer(
  state: GameState,
  action: AnyAction
): GameState {
  if (!isStartGameAction(action)) {
    return state;
  }

  const { mode } = action.payload;

  // AI goes first
  if (mode === "ai") {
    state = performAiMove(state);
  }

  return {
    ...state,
    mode
  };
}
