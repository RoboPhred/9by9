import { createSelector } from "reselect";

import { AppState, AppSelector } from "@/state";

import { GameState, TokensArray } from "./state";

import { getTokenIndexXYG, getTokenIndexXY } from "./utils";
import { TokenType } from "./types";

type LocalGameSelector<T> = (state: GameState) => T;

type GameSelector<T> = AppSelector<T> & { local: LocalGameSelector<T> };

function gameStateSelector(state: AppState) {
  return state.services.game;
}

function createGameSelector<T>(
  localSelector: LocalGameSelector<T>
): GameSelector<T> {
  const selector: GameSelector<T> = createSelector(
    gameStateSelector,
    localSelector
  ) as any;
  selector.local = localSelector;
  return selector;
}

export const tokensSelector = (state: AppState) => state.services.game.tokens;
export const turnSelector = (state: AppState) => state.services.game.turn;

interface WinningEntry {
  token: TokenType;
  positions: [number, number, number];
}

// There is porbably a more elegant way of finding the win lines...

function* iterateGridWinLines(
  gridPositions: number[]
): Iterable<[number, number, number]> {
  // horiz
  for (let y = 0; y < 3; y++) {
    yield [
      gridPositions[getTokenIndexXY(0, y)],
      gridPositions[getTokenIndexXY(1, y)],
      gridPositions[getTokenIndexXY(2, y)]
    ];
  }

  // vert
  for (let x = 0; x < 3; x++) {
    yield [
      gridPositions[getTokenIndexXY(x, 0)],
      gridPositions[getTokenIndexXY(x, 1)],
      gridPositions[getTokenIndexXY(x, 2)]
    ];
  }

  // cross
  yield [
    gridPositions[getTokenIndexXY(0, 0)],
    gridPositions[getTokenIndexXY(1, 1)],
    gridPositions[getTokenIndexXY(2, 2)]
  ];
  yield [
    gridPositions[getTokenIndexXY(2, 0)],
    gridPositions[getTokenIndexXY(1, 1)],
    gridPositions[getTokenIndexXY(0, 2)]
  ];
}

function* iterateWinLines(): Iterable<[number, number, number]> {
  // Grids
  for (let g = 0; g < 3; g++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, g),
      getTokenIndexXYG(1, 0, g),
      getTokenIndexXYG(2, 0, g),
      getTokenIndexXYG(0, 1, g),
      getTokenIndexXYG(1, 1, g),
      getTokenIndexXYG(2, 1, g),
      getTokenIndexXYG(0, 2, g),
      getTokenIndexXYG(1, 2, g),
      getTokenIndexXYG(2, 2, g)
    ]);
  }

  // Grid row slices
  for (let rowMajor = 0; rowMajor < 3; rowMajor++) {
    for (let rowMinor = 0; rowMinor < 3; rowMinor++) {
      yield* iterateGridWinLines([
        getTokenIndexXYG(0, 0, rowMajor * 3),
        getTokenIndexXYG(1, 0, rowMajor * 3),
        getTokenIndexXYG(2, 0, rowMajor * 3),
        getTokenIndexXYG(0, 0, rowMajor * 3 + 1),
        getTokenIndexXYG(1, 0, rowMajor * 3 + 1),
        getTokenIndexXYG(2, 0, rowMajor * 3 + 1),
        getTokenIndexXYG(0, 0, rowMajor * 3 + 2),
        getTokenIndexXYG(1, 0, rowMajor * 3 + 2),
        getTokenIndexXYG(2, 0, rowMajor * 3 + 2)
      ]);
    }
  }

  // Grid row cross axis
  for (let rowMajor = 0; rowMajor < 3; rowMajor++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, rowMajor * 3),
      getTokenIndexXYG(0, 1, rowMajor * 3),
      getTokenIndexXYG(0, 2, rowMajor * 3),
      getTokenIndexXYG(1, 0, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 1, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 2, rowMajor * 3 + 1),
      getTokenIndexXYG(2, 0, rowMajor * 3 + 2),
      getTokenIndexXYG(2, 1, rowMajor * 3 + 2),
      getTokenIndexXYG(2, 2, rowMajor * 3 + 2)
    ]);
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, rowMajor * 3 + 2),
      getTokenIndexXYG(0, 1, rowMajor * 3 + 2),
      getTokenIndexXYG(0, 2, rowMajor * 3 + 2),
      getTokenIndexXYG(1, 0, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 1, rowMajor * 3 + 1),
      getTokenIndexXYG(1, 2, rowMajor * 3 + 1),
      getTokenIndexXYG(2, 0, rowMajor * 3),
      getTokenIndexXYG(2, 1, rowMajor * 3),
      getTokenIndexXYG(2, 2, rowMajor * 3)
    ]);
  }

  // Grid column slices
  for (let columnMajor = 0; columnMajor < 3; columnMajor++) {
    for (let columnMinor = 0; columnMinor < 3; columnMinor++) {
      yield* iterateGridWinLines([
        getTokenIndexXYG(columnMinor, 0, columnMajor),
        getTokenIndexXYG(columnMinor, 1, columnMajor),
        getTokenIndexXYG(columnMinor, 2, columnMajor),
        getTokenIndexXYG(columnMinor, 0, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 1, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 2, columnMajor + 3),
        getTokenIndexXYG(columnMinor, 0, columnMajor + 6),
        getTokenIndexXYG(columnMinor, 1, columnMajor + 6),
        getTokenIndexXYG(columnMinor, 2, columnMajor + 6)
      ]);
    }
  }

  // Grid column cross axis
  for (let columnMajor = 0; columnMajor < 3; columnMajor++) {
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, columnMajor),
      getTokenIndexXYG(1, 0, columnMajor),
      getTokenIndexXYG(2, 0, columnMajor),
      getTokenIndexXYG(0, 1, columnMajor + 3),
      getTokenIndexXYG(1, 1, columnMajor + 3),
      getTokenIndexXYG(2, 1, columnMajor + 3),
      getTokenIndexXYG(0, 2, columnMajor + 6),
      getTokenIndexXYG(1, 2, columnMajor + 6),
      getTokenIndexXYG(2, 2, columnMajor + 6)
    ]);
    yield* iterateGridWinLines([
      getTokenIndexXYG(0, 0, columnMajor + 6),
      getTokenIndexXYG(1, 0, columnMajor + 6),
      getTokenIndexXYG(2, 0, columnMajor + 6),
      getTokenIndexXYG(0, 1, columnMajor + 3),
      getTokenIndexXYG(1, 1, columnMajor + 3),
      getTokenIndexXYG(2, 1, columnMajor + 3),
      getTokenIndexXYG(0, 2, columnMajor),
      getTokenIndexXYG(1, 2, columnMajor),
      getTokenIndexXYG(2, 2, columnMajor)
    ]);
  }

  // // Crosses for second-level grid.
  yield [
    getTokenIndexXYG(0, 0, 0),
    getTokenIndexXYG(1, 1, 4),
    getTokenIndexXYG(2, 2, 8)
  ];
  yield [
    getTokenIndexXYG(2, 0, 2),
    getTokenIndexXYG(1, 1, 4),
    getTokenIndexXYG(0, 2, 6)
  ];
}

const winLines = Array.from(iterateWinLines());

const winningEntry = createSelector(
  (state: GameState) => state.tokens,
  tokens => {
    for (const winLine of winLines) {
      const winningToken = tokensMatchWinLine(tokens, winLine);
      if (!winningToken) {
        continue;
      }

      return {
        token: winningToken,
        positions: winLine
      } as WinningEntry;
    }

    return null;
  }
);

function tokensMatchWinLine(
  tokens: TokensArray,
  winLine: [number, number, number]
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

export const winningToken = createGameSelector<TokenType | null>(state => {
  const entry = winningEntry(state);
  if (entry) {
    return entry.token;
  }

  return null;
});

export const winningPositions = createGameSelector<number[] | null>(state => {
  const entry = winningEntry(state);
  if (entry) {
    return entry.positions;
  }

  return null;
});
