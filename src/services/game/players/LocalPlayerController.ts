import { inject, injectable } from "microinject";

import { EventBus } from "../EventBus";
import { PlayerController } from "../PlayerController";
import { TokenIndex } from "../types";

@injectable()
export class LocalPlayerController implements PlayerController {
  constructor(@inject(EventBus) private readonly _eventBus: EventBus) {}

  getNextMove(): Promise<TokenIndex> {
    return new Promise<TokenIndex>((accept) => {
      this._eventBus.once("grid-slot:click", ({ gridSlot }) =>
        accept(gridSlot.index)
      );
    });
  }
}
