import { fill, range } from "lodash";
import { BehaviorSubject } from "rxjs";
import { GameGrid } from "./GameGrid";

import { FieldTokensArray } from "./types";

export class GameField {
  private readonly _grids: GameGrid[] = [];
  private _tokens$ = new BehaviorSubject<FieldTokensArray>([]);

  constructor() {
    this._grids = range(0, 9).map(
      (gridIndex) =>
        new GameGrid(gridIndex * 9, this._tokens$, (index, token) => {
          if (index < 0 || index >= 9 * 9) {
            throw new Error("Index out of range");
          }
          const tokens = this._tokens$.value.slice();
          tokens[index] = token;
          this._tokens$.next(tokens);
        })
    );
    Object.freeze(this._grids);
    this.reset();
  }

  get grids(): readonly GameGrid[] {
    return this._grids;
  }

  reset() {
    this._tokens$.next(fill(new Array(9 * 9), null));
  }
}
