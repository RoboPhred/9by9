import { fill } from "lodash";

import { TokenType } from "./types";
import { GRIDS, TOKENS_PER_GRID } from "./consts";

export type TokenState = TokenType | "blank";

export type TokensArray = TokenState[];
export interface GameState {
  turn: TokenType;
  tokens: TokensArray;
}

export const defaultGameState: Readonly<GameState> = Object.freeze({
  turn: "x",
  tokens: fill(new Array(TOKENS_PER_GRID * GRIDS), "blank") as TokensArray
});
