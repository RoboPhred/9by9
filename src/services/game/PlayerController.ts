import { TokenPosition } from "./types";

export interface PlayerController {
  getNextMove(): Promise<TokenPosition>;
}
