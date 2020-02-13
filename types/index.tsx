import { AppStateType, AppActionsType } from "./appTypes";
import { PokemonStateType, PokemonActionsType } from "./pokemonTypes"

// add all state types to the object. had 1 in this example
export type ApplicationStateType = {
  appReducer: AppStateType,
  pokemonReducer: PokemonStateType
};

// union of all actions
export type ApplicationActionsType = AppActionsType | PokemonActionsType;


