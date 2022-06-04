import { AnyAction } from "redux";
import { find, shuffle, range } from "lodash";
import { set as setFp } from "lodash/fp";

import { isNotNull } from "@/utils";

import { GameState, defaultGameState } from "../state";
import { isPlaceTokenAction } from "../actions/place-token";
import { winningPositions, winningToken } from "../selectors";
import { AI_TOKEN } from "../consts";
import { TokenType, WinLine, TokensArray } from "../types";
import winLines from "../win-lines";
import { performAiMove } from "./ai-move";

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

  if (
    state.mode === "ai" &&
    state.turn === AI_TOKEN &&
    winningToken.local(state) == null
  ) {
    state = performAiMove(state);
    state = {
      ...state,
      turn: state.turn === "x" ? "o" : "x"
    };
  }

  return state;
}
