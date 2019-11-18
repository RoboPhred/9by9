import reduceReducers from "reduce-reducers";

import { GameState } from "../state";

import placeTokenReducer from "./place-token";
import resetReducer from "./reset";
import startGameReducer from "./start-game";

const gameReducer = reduceReducers<GameState>(
  placeTokenReducer,
  resetReducer,
  startGameReducer
);
export default gameReducer;
