import { TokenIndex } from "./types";

export interface PlayerController {
  getNextMove(): Promise<TokenIndex>;
}
