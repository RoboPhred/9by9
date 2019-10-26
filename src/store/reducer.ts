import { combineReducers, AnyAction, Reducer } from "redux";

import { AppState, defaultAppState } from "@/state";
import gameReducer from "@/services/game/reducer";
import { GameState } from "@/services/game/state";

const servicesReducer = combineReducers({
  // reduce-reducer types are not aligning with redux types
  game: gameReducer as Reducer<GameState>
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action)
  };
}
