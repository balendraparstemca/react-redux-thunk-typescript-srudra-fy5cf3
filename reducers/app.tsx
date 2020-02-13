import { AppActionsType, AppStateType } from "../types/appTypes"

const INITIAL_STATE: AppStateType = {
  counter: 0
};

export default (state = INITIAL_STATE, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case "INCREMENT": {
      return {
        ...state,
        counter: state.counter + 1
      }
    };
    case "SET_COUNTER": {
      return {
        ...state,
        counter: action.payload
      }
    };
    case "RESET": {
      return {
        ...state,
        counter: INITIAL_STATE.counter
      }
    };
    default: {
      return state
    }
  }
}