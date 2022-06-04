import { range } from "lodash";
import { Container, inject, injectable, injectParam } from "microinject";

import { GameGridSlot, GameGridSlotParams } from "./GameGridSlot";
import { GridIndex } from "./types";

export namespace GameGridParams {
  export const GridIndex = "GridIndex";
}

@injectable()
export class GameGrid {
  private readonly _slots: GameGridSlot[];

  constructor(
    @inject(Container) container: Container,
    @injectParam(GameGridParams.GridIndex)
    gridIndex: GridIndex
  ) {
    this._slots = range(0, 9).map((index) =>
      container.get(GameGridSlot, {
        [GameGridSlotParams.Index]: gridIndex * 9 + index,
      })
    );
    Object.freeze(this._slots);
  }

  get slots(): readonly GameGridSlot[] {
    return this._slots;
  }
}
