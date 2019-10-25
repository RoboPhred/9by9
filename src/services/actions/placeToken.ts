import { AnyAction } from "redux";

export const ACTION_PLACE_TOKEN = "@game/place-token";
export const placeToken = (position: number) =>
  ({
    type: ACTION_PLACE_TOKEN,
    payload: { position }
  } as const);
export type PlaceTokenAction = ReturnType<typeof placeToken>;
export function isPlaceTokenAction(
  action: AnyAction
): action is PlaceTokenAction {
  return action.type === ACTION_PLACE_TOKEN;
}
