export enum Token {
  X = "x",
  O = "o",
}

export type FieldTokensArray = readonly (Token | null)[];

export type TokenSlot = Token | null;

export enum PlayerTurn {
  PlayerX = "player-x",
  PlayerO = "player-o",
}

export interface TokenPosition {
  grid: number;
  x: number;
  y: number;
}

export type WinLine = [number, number, number];
