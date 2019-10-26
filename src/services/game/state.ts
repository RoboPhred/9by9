import { TokenType } from "./types";

export type TokenState = TokenType | "blank";

export interface GameState {
  turn: TokenType;
  tokens: TokenState[];
}

export const defaultGameState: Readonly<GameState> = Object.freeze({
  turn: "x",
  tokens: [
    "blank",
    "blank",
    "blank",
    "blank",
    "blank",
    "blank",
    "blank",
    "blank",
    "blank"
  ]
});
