import { Container, inject, injectable, singleton } from "microinject";
import { GameSession } from "./GameSession";
import { LocalPlayerController } from "./players/LocalPlayerController";
import { WinLineAIPlayerController } from "./players/WinLineAIPlayerController";

@injectable()
@singleton()
export class GameController {
  constructor(
    @inject(Container) private readonly _container: Container,
    @inject(GameSession) private readonly _session: GameSession
  ) {}

  get session(): GameSession {
    return this._session;
  }

  startTwoPlayerGame() {
    this._session.startGame(
      this._container.get(LocalPlayerController),
      this._container.get(LocalPlayerController)
    );
  }

  startAIGame() {
    this._session.startGame(
      this._container.get(LocalPlayerController),
      this._container.get(WinLineAIPlayerController)
    );
  }
}
