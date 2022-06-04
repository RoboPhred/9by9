import { GameState, defaultGameState } from "../state";
import { AnyAction } from "redux";
import { isResetAction } from "@/services/game/actions/reset";
import { performAiMove } from "./ai-move";

export default function resetReducer(
  state: GameState = defaultGameState,
  action: AnyAction
): GameState {
  if (!isResetAction(action)) {
    return state;
  }

  state = {
    ...defaultGameState,
    mode: state.mode
  };

  if (state.mode === "ai") {
    state = performAiMove(state);
  }

  return state;
}
