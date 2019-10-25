export type TokenState = "x" | "o" | "blank";

export interface GameState {
  turn: "x" | "o";
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
