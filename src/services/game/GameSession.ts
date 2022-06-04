import { inject, injectable, singleton } from "microinject";

import { GameField } from "./GameField";
import { GameFieldTokens } from "./GameFieldTokens";
import { PlayerController } from "./PlayerController";
import { Token, TokenIndex } from "./types";

@injectable()
@singleton()
export class GameSession {
  private _currentGame: CancellationToken | null = null;
  private _turn: Token | null = null;

  private _playerX: PlayerController | null = null;
  private _playerO: PlayerController | null = null;

  constructor(
    @inject(GameFieldTokens) private _tokens: GameFieldTokens,
    @inject(GameField) private readonly _field: GameField
  ) {}

  get field(): GameField {
    return this._field;
  }

  get currentPlayer(): PlayerController | null {
    switch (this._turn) {
      case Token.X:
        return this._playerX;
      case Token.O:
        return this._playerO;
    }

    return null;
  }

  startGame(playerX: PlayerController, playerO: PlayerController) {
    if (this._currentGame) {
      this._currentGame.cancel();
    }

    this._currentGame = new CancellationToken();
    this._playerX = playerX;
    this._playerO = playerO;
    this._tokens.reset();

    this._runGame();
  }

  reset() {
    this._currentGame = null;
    this._playerX = null;
    this._playerO = null;
    this._tokens.reset();
  }

  private async _runGame() {
    const currentGame = this._currentGame;
    if (!currentGame) {
      return;
    }

    while (!currentGame.isCancelled) {
      this._nextTurn();
      if (this._turn == null) {
        break;
      }

      const move = await this._getNextMove();

      if (currentGame.isCancelled || move == null || this._turn == null) {
        break;
      }

      this._tokens.setIndex(move, this._turn);
    }
  }

  private _nextTurn() {
    switch (this._turn) {
      case null:
      case Token.O:
        this._turn = Token.X;
        break;
      case Token.X:
        this._turn = Token.O;
        break;
    }
  }

  private async _getNextMove() {
    const player = this.currentPlayer;
    if (!player) {
      return null;
    }

    let move: TokenIndex;
    do {
      move = await player.getNextMove(this._turn!);
    } while (this._tokens.getIndex(move) != null);

    return move;
  }
}

class CancellationToken {
  private _isCancelled = false;

  get isCancelled() {
    return this._isCancelled;
  }

  cancel() {
    this._isCancelled = true;
  }
}
