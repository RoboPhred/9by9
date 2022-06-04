import { Token, WinLine, FieldTokensArray } from "./types";

export function getTokenArrayIndex(grid: number, position: number): number {
  return grid * 9 + position;
}

export function getTokenIndexXYG(x: number, y: number, g: number): number {
  if (g < 0 || g >= 9) {
    throw new Error("Grid out of range");
  }

  return g * 9 + getTokenIndexXY(x, y);
}

export function getTokenIndexXY(x: number, y: number): number {
  if (x < 0 || x >= 3) {
    throw new Error("X out of range");
  }
  if (y < 0 || y >= 3) {
    throw new Error("Y out of range");
  }
  return y * 3 + x;
}

export function tokensMatchWinLine(
  tokens: FieldTokensArray,
  winLine: WinLine
): Token | null {
  const token = tokens[winLine[0]];
  if (token === null) {
    return null;
  }

  for (let i = 1; i < winLine.length; i++) {
    if (tokens[winLine[i]] !== token) {
      return null;
    }
  }

  return token;
}
