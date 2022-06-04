import { injectable, singleton } from "microinject";
import { EventEmitter } from "events";

import { GameGridSlot } from "./GameGridSlot";

@injectable()
@singleton()
export class EventBus {
  private readonly _emitter = new EventEmitter();

  on(
    event: "grid-slot:click",
    handler: (e: GridSlotClickedEventArgs) => void
  ): void;
  on(event: string, handler: (e: any) => void): void {
    this._emitter.on(event, handler);
  }

  once(
    event: "grid-slot:click",
    handler: (e: GridSlotClickedEventArgs) => void
  ): void;
  once(event: string, handler: (e: any) => void): void {
    this._emitter.once(event, handler);
  }

  onGridSlotClicked(gridSlot: GameGridSlot): void {
    this._emitter.emit("grid-slot:click", { gridSlot });
  }
}

export interface GridSlotClickedEventArgs {
  gridSlot: GameGridSlot;
}
