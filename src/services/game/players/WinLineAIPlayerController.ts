import { isNotNull } from "@/utils";
import { find, range, shuffle } from "lodash";
import { inject, injectable } from "microinject";

import { GameFieldTokens } from "../GameFieldTokens";
import { PlayerController } from "../PlayerController";
import { FieldTokensArray, Token, TokenIndex, WinLine } from "../types";
import winLines from "../win-lines";

@injectable()
export class WinLineAIPlayerController implements PlayerController {
  constructor(
    @inject(GameFieldTokens) private readonly _tokens: GameFieldTokens
  ) {}

  async getNextMove(playerToken: Token): Promise<TokenIndex> {
    const tokens = this._tokens.value;
    const potentials = winLines
      .map((line) => winLineWinningPotential(tokens, line))
      .filter(isNotNull);

    function moveOnLine(winLine: WinLine): TokenIndex {
      for (let i = 0; i < 3; i++) {
        const index = winLine[i];
        if (tokens[index] === null) {
          return index;
        }
      }

      throw new Error("Cannot make ai move on win line: no free indexes.");
    }

    const highPriority = potentials.filter((x) => x.count === 2);
    if (highPriority.length > 0) {
      // First, try to win.
      const winningLine = find(highPriority, (x) => x.token == playerToken);
      if (winningLine) {
        return moveOnLine(winningLine.winLine);
      }

      // Try to block the opponent
      return moveOnLine(highPriority[0].winLine);
    }

    // Try to advance, ignore what the player is doing
    let advance = potentials.filter(
      (x) => x.count === 1 && x.token === playerToken
    );
    if (advance.length > 0) {
      advance = shuffle(advance);
      return moveOnLine(advance[0].winLine);
    }

    // Move randomly.
    let candidates = range(0, tokens.length).filter((x) => tokens[x] === null);
    candidates = shuffle(candidates);
    return candidates[0] as TokenIndex;
  }
}

interface WinLinePotential {
  winLine: WinLine;
  count: number;
  token: Token;
}

function winLineWinningPotential(
  tokens: FieldTokensArray,
  winLine: WinLine
): WinLinePotential | null {
  let count = 0;
  let foundToken: Token | null = null;
  for (let i = 0; i < 3; i++) {
    const tokenIndex = winLine[i];
    const token = tokens[tokenIndex];
    if (foundToken != null) {
      if (token === foundToken) {
        count++;
      } else if (token != null) {
        // Line is blocked
        return null;
      }
    } else if (token != null) {
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
    token: foundToken,
  };
}
