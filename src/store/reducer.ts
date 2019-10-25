import { combineReducers, AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";
import gameReducer from "@/services/game/reducer";

const servicesReducer = combineReducers({
  game: gameReducer
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action)
  };
}
