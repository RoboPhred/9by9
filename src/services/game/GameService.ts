import { injectable, singleton } from "microinject";
import { GameField } from "./GameField";

@injectable()
@singleton()
export class GameService {
  private _field: GameField = new GameField();

  get field(): GameField {
    return this._field;
  }
}
