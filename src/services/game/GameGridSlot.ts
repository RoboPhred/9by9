import { inject, injectable, injectParam } from "microinject";
import { Observable, map } from "rxjs";

import { EventBus } from "./EventBus";
import { GameFieldTokens } from "./GameFieldTokens";
import { TokenIndex, TokenSlot } from "./types";
import { WinCondition } from "./WinCondition";

export namespace GameGridSlotParams {
  export const Index = "index";
}

@injectable()
export class GameGridSlot {
  private _token$: Observable<TokenSlot>;
  private _isWinningToken$: Observable<boolean>;

  constructor(
    @injectParam(GameGridSlotParams.Index)
    private readonly _index: TokenIndex,
    @inject(GameFieldTokens) tokens$: GameFieldTokens,
    @inject(WinCondition) winCondition: WinCondition,
    @inject(EventBus)
    private readonly _eventBus: EventBus
  ) {
    this._token$ = tokens$.pipe(map((tokens) => tokens[this._index]));
    this._isWinningToken$ = winCondition.completedWinLines$.pipe(
      map((winLines) =>
        winLines.some((line) => line.indexOf(this._index) !== -1)
      )
    );
  }

  get index(): TokenIndex {
    return this._index;
  }

  get token$(): Observable<TokenSlot> {
    return this._token$;
  }

  get isWinningToken$(): Observable<boolean> {
    return this._isWinningToken$;
  }

  onClick(): void {
    this._eventBus.onGridSlotClicked(this);
  }
}
