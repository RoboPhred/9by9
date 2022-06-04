import { fill } from "lodash";
import { injectable, singleton } from "microinject";
import { BehaviorSubject, Observable } from "rxjs";

import { FieldTokensArray, Token, TokenIndex } from "./types";

@injectable()
@singleton()
export class GameFieldTokens extends Observable<FieldTokensArray> {
  private _tokens$ = new BehaviorSubject<FieldTokensArray>([]);

  constructor() {
    super((sub) => this._tokens$.subscribe(sub));
    this.reset();
  }

  get value(): FieldTokensArray {
    return this._tokens$.value;
  }

  getIndex(index: TokenIndex): Token | null {
    if (index < 0 || index >= this._tokens$.value.length) {
      throw new Error("Index out of range");
    }

    return this._tokens$.value[index];
  }

  setIndex(index: TokenIndex, token: Token | null) {
    if (index < 0 || index >= this._tokens$.value.length) {
      throw new Error("Index out of range");
    }

    const tokens = this._tokens$.value.slice();
    tokens[index] = token;
    this._tokens$.next(tokens);
  }

  reset() {
    this._tokens$.next(fill(new Array(9 * 9), null));
  }
}
