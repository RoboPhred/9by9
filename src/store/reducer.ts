import { combineReducers, AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

const servicesReducer = combineReducers<{}>({});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action)
  };
}
