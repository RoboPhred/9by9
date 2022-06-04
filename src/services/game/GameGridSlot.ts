import { forEach } from "lodash";
import { Observable, map } from "rxjs";

import { FieldTokensArray, Token, TokenSlot } from "./types";
import { tokensMatchWinLine } from "./utils";
import winLines from "./win-lines";

export class GameGridSlot {
  private _token$: Observable<TokenSlot>;
  private _isWinningToken$: Observable<boolean>;

  constructor(
    private _index: number,
    tokens$: Observable<FieldTokensArray>,
    private readonly _setToken: (index: number, token: Token | null) => void
  ) {
    this._token$ = tokens$.pipe(map((tokens) => tokens[this._index]));
    this._isWinningToken$ = tokens$.pipe(
      map((tokens) => {
        for (const winLine of winLines) {
          if (tokensMatchWinLine(tokens, winLine)) {
            return true;
          }
        }

        return false;
      })
    );
  }

  get token$(): Observable<TokenSlot> {
    return this._token$;
  }

  get isWinningToken$(): Observable<boolean> {
    return this._isWinningToken$;
  }

  setToken(token: Token | null) {
    this._setToken(this._index, token);
  }

  onClick(): void {
    this.setToken(Token.X);
  }
}
