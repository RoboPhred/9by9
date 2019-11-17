import { TOKENS_PER_GRID } from "./consts";

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
