import { AnyAction } from "redux";
import { set as setFp } from "lodash/fp";
import { GameState, defaultGameState, getTokenArrayIndex } from "../state";
import { isPlaceTokenAction } from "../actions/placeToken";
import { winningPositions } from "../selectors";

export default function placeTokenReducer(
  state: GameState = defaultGameState,
  action: AnyAction
): GameState {
  if (!isPlaceTokenAction(action)) {
    return state;
  }

  // Dont place a token if someone already won.
  if (winningPositions.local(state)) {
    return state;
  }

  const { position } = action.payload;

  if (state.tokens[position] !== "blank") {
    return state;
  }

  state = {
    ...state,
    tokens: setFp([position], state.turn, state.tokens),
    turn: state.turn === "x" ? "o" : "x"
  };

  return state;
}
