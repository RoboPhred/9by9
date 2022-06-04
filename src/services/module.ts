import { composeModules } from "microinject";

import gameModule from "./game/module";

export default composeModules(gameModule);
