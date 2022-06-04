import { AnyAction } from "redux";

export const ACTION_RESET = "@game/reset";
export const reset = () =>
  ({
    type: ACTION_RESET
  } as const);
type ResetAction = ReturnType<typeof reset>;
export function isResetAction(action: AnyAction): action is ResetAction {
  return action.type === ACTION_RESET;
}
