import { Token, TokenIndex } from "./types";

export interface PlayerController {
  getNextMove(playerToken: Token): Promise<TokenIndex>;
}
