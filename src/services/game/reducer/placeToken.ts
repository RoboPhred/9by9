import { AnyAction } from "redux";
import { GameState, defaultGameState } from "../state";
import { isPlaceTokenAction } from "../actions/placeToken";
import { winningAxis } from "../selectors";

export default function placeTokenReducer(
  state: GameState = defaultGameState,
  action: AnyAction
): GameState {
  if (!isPlaceTokenAction(action)) {
    return state;
  }

  // Dont place a token if someone already won.
  if (winningAxis.local(state)) {
    return state;
  }

  const { position } = action.payload;

  // Don't place a token on a spot that isnt blank
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
