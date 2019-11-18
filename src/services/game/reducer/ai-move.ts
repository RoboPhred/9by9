import { find, shuffle } from "lodash";
import { set as setFp } from "lodash/fp";

import { isNotNull } from "@/utils";

import { GameState } from "../state";
import { WinLine, TokenType, TokensArray } from "../types";
import winLines from "../win-lines";
import { AI_TOKEN } from "../consts";

interface WinLinePotential {
  winLine: WinLine;
  count: number;
  token: TokenType;
}
export function performAiMove(state: GameState): GameState {
  const potentials = winLines
    .map(line => winLineWinningPotential(state.tokens, line))
    .filter(isNotNull);

  const highPriority = potentials.filter(x => x.count === 2);
  if (highPriority.length > 0) {
    // First, try to win.
    const winningLine = find(highPriority, x => x.token == AI_TOKEN);
    if (winningLine) {
      return aiMoveOnLine(state, winningLine.winLine);
    }

    // Try to block the opponent
    return aiMoveOnLine(state, highPriority[0].winLine);
  }

  // Try to advance, ignore what the player is doing
  let advance = potentials.filter(x => x.count === 1 && x.token === AI_TOKEN);
  if (advance.length > 0) {
    advance = shuffle(advance);
    return aiMoveOnLine(state, advance[0].winLine);
  }

  // I dunno... Move randomly.
  //  Probably could have a list of good starting moves here.
  while (true) {
    // Note: Use of random breaks reducer purity here.
    const position = Math.floor(state.tokens.length * Math.random());
    if (state.tokens[position] !== "blank") {
      continue;
    }
    return {
      ...state,
      tokens: setFp([position], AI_TOKEN, state.tokens)
    };
  }
}

function aiMoveOnLine(state: GameState, line: WinLine): GameState {
  const { tokens } = state;
  for (let i = 0; i < 3; i++) {
    const position = line[i];
    if (tokens[position] === "blank") {
      return {
        ...state,
        tokens: setFp([position], AI_TOKEN, state.tokens)
      };
    }
  }

  return state;
}

/**
 * Returns the count of tokens on the line from 0 to 3.
 * Returns -1 if the line is unwinnable (blocked by both tokens present).
 * @param tokens
 * @param winLine
 */
function winLineWinningPotential(
  tokens: TokensArray,
  winLine: WinLine
): WinLinePotential | null {
  let count = 0;
  let foundToken: TokenType | null = null;
  for (let i = 0; i < 3; i++) {
    const tokenIndex = winLine[i];
    const token = tokens[tokenIndex];
    if (foundToken != null) {
      if (token === foundToken) {
        count++;
      } else if (token != "blank") {
        // Line is blocked
        return null;
      }
    } else if (token != "blank") {
      foundToken = token;
      count++;
    }
  }

  if (!foundToken) {
    return null;
  }

  return {
    winLine: winLine,
    count,
    token: foundToken
  };
}
