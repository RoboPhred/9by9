import { createSelector } from "reselect";

import { AppState, AppSelector } from "@/state";

import { GameState } from "./state";
import { TokenType } from "./types";
import winLines from "./win-lines";
import { tokensMatchWinLine } from "./utils";

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

export const modeSelector = (state: AppState) => state.services.game.mode;
export const tokensSelector = (state: AppState) => state.services.game.tokens;
export const turnSelector = (state: AppState) => state.services.game.turn;

interface WinningEntry {
  token: TokenType;
  positions: [number, number, number];
}

const winningEntry = createSelector(
  (state: GameState) => state.tokens,
  tokens => {
    for (const winLine of winLines) {
      const winningToken = tokensMatchWinLine(tokens, winLine);
      if (!winningToken) {
        continue;
      }

      const entry: WinningEntry = {
        token: winningToken,
        positions: winLine
      };

      return entry;
    }

    return null;
  }
);

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
