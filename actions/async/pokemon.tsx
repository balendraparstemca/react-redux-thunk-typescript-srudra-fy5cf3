import asyncActionCreator, { AsyncActionType } from "./async-action-creator";

import {
  RequestPokemonActionType,
  ReceivePokemonActionType,
  ErrorPokemonActionType
} from "../../types/pokemonTypes";

const requestPokemon = (): RequestPokemonActionType => ({
  type: "REQUEST_POKEMON"
})

const receivePokemon = (response: string): ReceivePokemonActionType => ({
  type: "RECEIVE_POKEMON",
  payload: { result: JSON.parse(response) }
})

const errorPokemon = (error: string): ErrorPokemonActionType => ({
  type: "ERROR_POKEMON",
  payload: { error }
})

export const fetchPokemon = (number: number): AsyncActionType => (
  asyncActionCreator(
    `https://pokeapi.co/api/v2/pokemon/${number}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    },
    () => requestPokemon(),
    response => receivePokemon(response),
    error => errorPokemon(error),
    state => {
      // based on true/ false this function will do the http requests
      // used when we need caching behaviour
      // for now setting as true to do fetch request for all
      return true;
    }
  )
)