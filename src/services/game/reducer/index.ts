import reduceReducers from "reduce-reducers";

import placeTokenReducer from "./placeToken";
import { GameState } from "../state";
import resetReducer from "./reset";

const gameReducer = reduceReducers<GameState>(placeTokenReducer, resetReducer);
export default gameReducer;
