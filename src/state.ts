import { GameState, defaultGameState } from "./services/game/state";

export interface AppState {
  services: {
    game: GameState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: {
    game: defaultGameState
  }
});

export type AppSelector<T = any> = (state: Readonly<AppState>) => T;
