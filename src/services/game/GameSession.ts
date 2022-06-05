import { inject, injectable, singleton } from "microinject";

import { GameField } from "./GameField";
import { GameFieldTokens } from "./GameFieldTokens";
import { PlayerController } from "./PlayerController";
import { Token, TokenIndex } from "./types";
import { WinCondition } from "./WinCondition";

@injectable()
@singleton()
export class GameSession {
  private _gameCancellationToken: CancellationToken | null = null;
  private _turn: Token | null = null;

  private _playerX: PlayerController | null = null;
  private _playerO: PlayerController | null = null;

  constructor(
    @inject(GameFieldTokens) private _tokens: GameFieldTokens,
    @inject(GameField) private readonly _field: GameField,
    @inject(WinCondition) private readonly _winCondition: WinCondition
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
    if (this._gameCancellationToken) {
      this._gameCancellationToken.cancel();
    }

    this._gameCancellationToken = new CancellationToken();
    this._playerX = playerX;
    this._playerO = playerO;
    this._tokens.reset();

    this._runGame();
  }

  stopGame() {
    if (this._gameCancellationToken) {
      this._gameCancellationToken.cancel();
      this._gameCancellationToken = null;
    }

    this._turn = null;
  }

  reset() {
    this._gameCancellationToken = null;
    this._playerX = null;
    this._playerO = null;
    this._tokens.reset();
  }

  private async _runGame() {
    const currentGame = this._gameCancellationToken;
    if (!currentGame) {
      this.stopGame();
      return;
    }

    gameLoop: while (!currentGame.isCancelled) {
      if (this._winCondition.isOver()) {
        break;
      }

      this._nextTurn();
      if (this._turn == null) {
        break;
      }

      while (true) {
        const move = await this._getNextMove();

        if (currentGame.isCancelled || move == null || this._turn == null) {
          break gameLoop;
        }

        if (this._tokens.getIndex(move) == null) {
          this._tokens.setIndex(move, this._turn);
          break;
        }
      }
    }

    this.stopGame();
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
      move = await player.getNextMove();
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
