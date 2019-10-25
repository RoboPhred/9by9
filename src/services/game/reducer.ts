import { AnyAction } from "redux";
import { GameState, defaultGameState } from "./state";
import { isPlaceTokenAction } from "../actions/placeToken";

export default function gameReducer(
  state: Readonly<GameState> = defaultGameState,
  action: AnyAction
): GameState {
  if (isPlaceTokenAction(action)) {
    const { position } = action.payload;
    if (state.tokens[position] !== "blank") {
      return state;
    }

    const newTokens = [...state.tokens];
    newTokens[position] = state.turn;
    return {
      ...state,
      tokens: newTokens,
      turn: state.turn == "x" ? "o" : "x"
    };
  }

  return state;
}
