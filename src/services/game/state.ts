import { TokenType } from "./types";
import { GRIDS, TOKENS_PER_GRID } from "./consts";
import { fill } from "lodash";

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

/**
 * Calculate the tokens array index of a particular token slot.
 * @param grid The grid index.  0 is upper left, 8 is lower right.
 * @param position The position inside the grid.  0 is upper left, 8 is lower right.
 */
export function getTokenIndex(grid: number, position: number): number {
  return grid * 9 + position;
}
