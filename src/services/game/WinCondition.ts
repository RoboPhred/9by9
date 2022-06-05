import { inject, injectable, singleton } from "microinject";
import { map, Observable } from "rxjs";
import { GameFieldTokens } from "./GameFieldTokens";
import { Token, WinLine } from "./types";
import { tokensMatchWinLine } from "./utils";
import winLines from "./win-lines";

@injectable()
@singleton()
export class WinCondition {
  private readonly _completedWinLines$: Observable<readonly WinLine[]>;

  constructor(
    @inject(GameFieldTokens) private readonly _tokens$: GameFieldTokens
  ) {
    this._completedWinLines$ = this._tokens$.pipe(
      map((tokens) => this.getCompletedWinLines())
    );
  }

  get completedWinLines$(): Observable<readonly WinLine[]> {
    return this._completedWinLines$;
  }

  isOver(): boolean {
    // For now, first winline wins
    return this.getCompletedWinLines().length > 0;
  }

  getCompletedWinLines(): readonly WinLine[] {
    // For now, first winline wins
    for (const line of winLines) {
      if (tokensMatchWinLine(this._tokens$.value, line)) {
        return [line];
      }
    }

    return [];
  }

  getScoreBias(): number {
    const tokens = this._tokens$.value;
    const winLines = this.getCompletedWinLines();

    // Win lines will have the same token in all 3 spots, so check what token makes up this line.
    const winningTokens = winLines.map((line) => tokens[line[0]]);

    const xWins = winningTokens.filter((x) => x === Token.X).length;
    const oWins = winningTokens.length - xWins;
    // Return a float from 1 to -1, where 1 is all x wins and -1 is all o wins.
    return (xWins / winningTokens.length) * 2 - 1;
  }
}
