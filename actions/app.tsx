import { IncrementActionType, SetCounterActionType, ResetActionType } from "../types/appTypes";

export const increment = (): IncrementActionType => (
  {
    type: "INCREMENT"
  }
)

export const setCounter = (payload: number): SetCounterActionType => (
  {
    type: "SET_COUNTER",
    payload: payload
  }
)

export const reset = (): ResetActionType => (
  {
    type: "RESET"
  }
) 