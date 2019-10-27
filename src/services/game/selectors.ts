import { createSelector } from "reselect";

import { AppState, AppSelector } from "@/state";
import { GameState, TokensArray } from "./state";
import { WinAxis, TokenType } from "./types";

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

interface WinTableEntry {
  positions: number[];
  axis: WinAxis;
}

const WinTable: WinTableEntry[] = [
  {
    positions: [0, 1, 2],
    axis: WinAxis.Y0
  },
  {
    positions: [3, 4, 5],
    axis: WinAxis.Y1
  },
  {
    positions: [6, 7, 8],
    axis: WinAxis.Y2
  },
  {
    positions: [0, 3, 6],
    axis: WinAxis.X0
  },
  {
    positions: [1, 4, 7],
    axis: WinAxis.X1
  },
  {
    positions: [2, 5, 8],
    axis: WinAxis.X2
  },
  {
    positions: [6, 4, 2],
    axis: WinAxis.CrossPositive
  },
  {
    positions: [0, 4, 8],
    axis: WinAxis.CrossNegative
  }
];

const winningEntry = createSelector(
  (state: GameState) => state.tokens,
  tokens => {
    for (const entry of WinTable) {
      const winningToken = tokensMatchEntry(tokens, entry);
      if (!winningToken) {
        continue;
      }

      return {
        token: winningToken,
        axis: entry.axis,
        positions: entry.positions
      };
    }

    return null;
  }
);

function tokensMatchEntry(
  tokens: TokensArray,
  entry: WinTableEntry
): TokenType | null {
  const token = tokens[entry.positions[0]];
  if (token === "blank") {
    return null;
  }

  for (let i = 1; i < entry.positions.length; i++) {
    if (tokens[entry.positions[i]] !== token) {
      return null;
    }
  }

  return token;
}

export const winningAxis = createGameSelector<WinAxis | null>(state => {
  const entry = winningEntry(state);
  if (entry) {
    return entry.axis;
  }

  return null;
});

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
