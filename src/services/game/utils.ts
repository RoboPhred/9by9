import { TOKENS_PER_GRID } from "./consts";
import { TokenType, WinLine, TokensArray } from "./types";

/**
 * Calculate the tokens array index of a particular token slot.
 * @param grid The grid index.  0 is upper left, 8 is lower right.
 * @param position The position inside the grid.  0 is upper left, 8 is lower right.
 */
export function getTokenArrayIndex(grid: number, position: number): number {
  return grid * 9 + position;
}

/**
 * Calculate the index of a token from x and y without regard for which grid.
 * @param x
 * @param y
 */
export function getTokenIndexXYG(x: number, y: number, g: number): number {
  return g * TOKENS_PER_GRID + getTokenIndexXY(x, y);
}

export function getTokenIndexXY(x: number, y: number): number {
  return y * 3 + x;
}

export function tokensMatchWinLine(
  tokens: TokensArray,
  winLine: WinLine
): TokenType | null {
  const token = tokens[winLine[0]];
  if (token === "blank") {
    return null;
  }

  for (let i = 1; i < winLine.length; i++) {
    if (tokens[winLine[i]] !== token) {
      return null;
    }
  }

  return token;
}
