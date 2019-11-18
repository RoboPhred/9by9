export type TokenType = "x" | "o";
export type GameMode = "local" | "ai";
export type TokenState = TokenType | "blank";
export type TokensArray = TokenState[];
export type WinLine = [number, number, number];
