import { GameState, defaultGameState } from "../state";
import { AnyAction } from "redux";
import { isResetAction } from "@/services/game/actions/reset";

export default function resetReducer(
  state: GameState = defaultGameState,
  action: AnyAction
): GameState {
  if (!isResetAction(action)) {
    return state;
  }

  return defaultGameState;
}
