import { fill } from "lodash";

import { TokenType, TokensArray, GameMode } from "./types";
import { GRIDS, TOKENS_PER_GRID } from "./consts";

export interface GameState {
  mode: GameMode | null;
  turn: TokenType;
  tokens: TokensArray;
}

export const defaultGameState: Readonly<GameState> = Object.freeze({
  mode: null,
  turn: "x",
  tokens: fill(new Array(TOKENS_PER_GRID * GRIDS), "blank") as TokensArray
});
