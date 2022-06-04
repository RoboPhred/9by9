import { ContainerModule } from "microinject";
import { EventBus } from "./EventBus";
import { GameController } from "./GameController";
import { GameField } from "./GameField";
import { GameFieldTokens } from "./GameFieldTokens";
import { GameGrid } from "./GameGrid";
import { GameGridSlot } from "./GameGridSlot";
import { GameSession } from "./GameSession";
import { LocalPlayerController } from "./players/LocalPlayerController";
import { WinLineAIPlayerController } from "./players/WinLineAIPlayerController";

export default new ContainerModule((bind) => {
  bind(LocalPlayerController);
  bind(WinLineAIPlayerController);
  bind(EventBus);
  bind(GameController);
  bind(GameField);
  bind(GameFieldTokens);
  bind(GameGrid);
  bind(GameGridSlot);
  bind(GameSession);
});
