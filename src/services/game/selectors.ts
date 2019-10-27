import { createSelector } from "reselect";
import { range } from "lodash";

import { AppState, AppSelector } from "@/state";
import {
  GameState,
  TokensArray,
  TokenState,
  getTokenIndexXYG,
  getTokenIndexXY
} from "./state";
import { TokenType } from "./types";
import { GRIDS, TOKENS_PER_GRID } from "./consts";

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
  // Row grids
  // 0, 1, 2 - 9, 10, 11 - 18, 19, 20
  // 3, 4, 5 - 12, 13, 14 - 21, 22, 23
  // ...
  for (let r = 0; r < GRIDS * 3; r++) {
    yield* iterateGridWinLines([
      ...range(r * 3, r * 3 + 3),
      ...range(9 + r * 3, 9 + r * 3 + 3),
      ...range(18 + r * 3, 18 + r * 3 + 3)
    ]);
  }

  // Column grids
  // 0, 3, 6 - 27, 30, 33 - 54, 57, 60
  // 1, 4, 7 - 28, 31, 34 - 55, 58, 61
  // ...
  for (let r = 0; r < GRIDS * 3; r++) {
    yield* iterateGridWinLines([
      ...range(0, 7, 3).map(x => x + r),
      ...range(27, 34, 3).map(x => x + r),
      ...range(54, 61, 3).map(x => x + r)
    ]);
  }

  // Crosses for individual grids.
  for (let g = 0; g < GRIDS; g++) {
    yield [
      getTokenIndexXYG(0, 0, g),
      getTokenIndexXYG(1, 1, g),
      getTokenIndexXYG(2, 2, g)
    ];
    yield [
      getTokenIndexXYG(2, 0, g),
      getTokenIndexXYG(1, 1, g),
      getTokenIndexXYG(0, 2, g)
    ];
  }

  // Crosses for row stacks
  for (let i = 0; i < 3; i++) {
    yield [
      getTokenIndexXYG(0, 0, 0 + i * 3),
      getTokenIndexXYG(1, 1, 1 + i * 3),
      getTokenIndexXYG(2, 2, 2 + i * 3)
    ];
    yield [
      getTokenIndexXYG(2, 0, 0 + i * 3),
      getTokenIndexXYG(1, 1, 1 + i * 3),
      getTokenIndexXYG(0, 2, 2 + i * 3)
    ];

    yield [
      getTokenIndexXYG(0, 2, 0 + i * 3),
      getTokenIndexXYG(1, 1, 1 + i * 3),
      getTokenIndexXYG(2, 0, 2 + i * 3)
    ];
    yield [
      getTokenIndexXYG(2, 2, 0 + i * 3),
      getTokenIndexXYG(1, 1, 1 + i * 3),
      getTokenIndexXYG(0, 0, 2 + i * 3)
    ];
  }

  // Crosses for column stacks
  for (let i = 0; i < 3; i++) {
    yield [
      getTokenIndexXYG(0, 0, 0 + i),
      getTokenIndexXYG(1, 1, 3 + i),
      getTokenIndexXYG(2, 2, 6 + i)
    ];
    yield [
      getTokenIndexXYG(2, 0, 0 + i),
      getTokenIndexXYG(1, 1, 3 + i),
      getTokenIndexXYG(0, 2, 6 + i)
    ];

    yield [
      getTokenIndexXYG(0, 2, 0 + i),
      getTokenIndexXYG(1, 1, 3 + i),
      getTokenIndexXYG(2, 0, 6 + i)
    ];
    yield [
      getTokenIndexXYG(2, 2, 0 + i),
      getTokenIndexXYG(1, 1, 3 + i),
      getTokenIndexXYG(0, 0, 6 + i)
    ];
  }

  // Crosses for second-level grid.
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
