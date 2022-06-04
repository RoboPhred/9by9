import { range } from "lodash";
import { Container, inject, injectable, singleton } from "microinject";

import { GameGrid, GameGridParams } from "./GameGrid";

@injectable()
export class GameField {
  private readonly _grids: GameGrid[] = [];

  constructor(@inject(Container) container: Container) {
    this._grids = range(0, 9).map((gridIndex) =>
      container.get(GameGrid, {
        [GameGridParams.GridIndex]: gridIndex,
      })
    );
    Object.freeze(this._grids);
  }

  get grids(): readonly GameGrid[] {
    return this._grids;
  }
}
