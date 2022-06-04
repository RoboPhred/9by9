import { inject, injectable, injectParam } from "microinject";
import { Observable, map } from "rxjs";

import { EventBus } from "./EventBus";
import { GameFieldTokens } from "./GameFieldTokens";
import { TokenIndex, TokenSlot } from "./types";
import { tokensMatchWinLine } from "./utils";
import winLines from "./win-lines";

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
    @inject(EventBus)
    private readonly _eventBus: EventBus
  ) {
    this._token$ = tokens$.pipe(map((tokens) => tokens[this._index]));
    this._isWinningToken$ = tokens$.pipe(
      map((tokens) => {
        for (const winLine of winLines) {
          if (tokensMatchWinLine(tokens, winLine)) {
            if (winLine.indexOf(this._index) !== -1) {
              return true;
            }
          }
        }

        return false;
      })
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
