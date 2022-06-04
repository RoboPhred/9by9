import { ContainerModule } from "microinject";
import { GameService } from "./GameService";

export default new ContainerModule((bind) => {
  bind(GameService);
});
