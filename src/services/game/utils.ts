import { Token, WinLine, FieldTokensArray, TokenIndex } from "./types";

export function getTokenArrayIndex(grid: number, position: number): TokenIndex {
  return (grid * 9 + position) as TokenIndex;
}

export function getTokenIndexXYG(x: number, y: number, g: number): TokenIndex {
  if (g < 0 || g >= 9) {
    throw new Error("Grid out of range");
  }

  return (g * 9 + getTokenIndexXY(x, y)) as TokenIndex;
}

export function getTokenIndexXY(x: number, y: number): TokenIndex {
  if (x < 0 || x >= 3) {
    throw new Error("X out of range");
  }
  if (y < 0 || y >= 3) {
    throw new Error("Y out of range");
  }
  return (y * 3 + x) as TokenIndex;
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
