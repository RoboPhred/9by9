import { Opaque } from "type-fest";

export enum Token {
  X = "x",
  O = "o",
}

export type GridIndex = Opaque<number, "GridIndex">;
export type TokenIndex = Opaque<number, "TokenIndex">;

export type FieldTokensArray = readonly (Token | null)[];

export type TokenSlot = Token | null;

export type WinLine = [number, number, number];
