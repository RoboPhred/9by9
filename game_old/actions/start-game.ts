import { AnyAction } from "redux";
import { GameMode } from "../types";

export const ACTION_START_GAME = "@game/start";
export const startGame = (mode: GameMode) =>
  ({
    type: ACTION_START_GAME,
    payload: { mode }
  } as const);
type ResetAction = ReturnType<typeof startGame>;
export function isStartGameAction(action: AnyAction): action is ResetAction {
  return action.type === ACTION_START_GAME;
}
