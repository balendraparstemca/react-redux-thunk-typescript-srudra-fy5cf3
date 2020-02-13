import { PokemonActionsType, PokemonStateType } from "../types/pokemonTypes";

const INITIAL_STATE: PokemonStateType = {
  loading: false,
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action: PokemonActionsType): PokemonStateType => {
  switch (action.type) {
    case "REQUEST_POKEMON": {
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      }
    }
    case "RECEIVE_POKEMON": {
      const data = action.payload.result.id ? action.payload.result : null;
      const error = action.payload.result.id ? null : "Nothing found";
      return {
        ...state,
        loading: false,
        data: data,
        error: error
      }
    }
    case "ERROR_POKEMON": {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      }
    }
    default: {
      return { ...state }
    }
  }
}