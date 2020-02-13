import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import appReducer from "./reducers/app";
import pokemonReducer from "./reducers/pokemon"

import { ApplicationStateType } from "./types";

export default createStore(
  combineReducers<ApplicationStateType>({
    appReducer,
    pokemonReducer
  }),
  applyMiddleware(thunk)
);