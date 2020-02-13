// For action creators

/**
 * We need to explicitly mention all the types for redux actions
 * otherwise the compiler doesnt know whats the structure for each action type.
 * because of explicit type the reducer switch(action.type) doesnt allow mispelled/ extra types
 */

export type IncrementActionType = {
  type: "INCREMENT"
};

export type SetCounterActionType = {
  type: "SET_COUNTER",
  payload: number
};

export type ResetActionType = {
  type: "RESET"
}

export type AppActionsType = IncrementActionType | SetCounterActionType | ResetActionType;

// for reducer

export type AppStateType = {
  readonly counter: number
}