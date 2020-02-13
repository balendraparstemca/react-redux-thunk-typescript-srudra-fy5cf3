// For action creators

/**
 * We need to explicitly mention all the types for redux actions
 * otherwise the compiler doesnt know whats the structure for each action type.
 * because of explicit type the reducer switch(action.type) doesnt allow mispelled/ extra types
 */

export type RequestPokemonActionType = {
  type: "REQUEST_POKEMON"
};

export type ReceivePokemonActionType = {
  type: "RECEIVE_POKEMON",
  payload: {
    result: {
      id: number,
      name: string,
      [propName: string]: any
    }
  }
}

export type ErrorPokemonActionType = {
  type: "ERROR_POKEMON",
  payload: { error: object | string }
}

export type PokemonActionsType = RequestPokemonActionType
  | ReceivePokemonActionType
  | ErrorPokemonActionType;

// For  reducer

export type PokemonStateType = {
  readonly loading: boolean,
  readonly data: null | { id: number, name: string, [propName: string]: any },
  readonly error: null | object | string
}                            