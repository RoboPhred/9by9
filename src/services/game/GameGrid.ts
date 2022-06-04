import { range } from "lodash";
import { Observable } from "rxjs";
import { GameGridSlot } from "./GameGridSlot";
import { FieldTokensArray, TokenSlot } from "./types";

export class GameGrid {
  private readonly _slots: GameGridSlot[];

  constructor(
    startingIndex: number,
    tokens$: Observable<FieldTokensArray>,
    setToken: (index: number, token: TokenSlot | null) => void
  ) {
    this._slots = range(0, 9).map((index) => {
      return new GameGridSlot(startingIndex + index, tokens$, setToken);
    });
    Object.freeze(this._slots);
  }

  get slots(): readonly GameGridSlot[] {
    return this._slots;
  }
}
