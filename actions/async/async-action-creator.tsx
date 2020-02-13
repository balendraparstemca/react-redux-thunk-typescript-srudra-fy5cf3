import "whatwg-fetch";
import { Dispatch } from "redux"

import { ApplicationActionsType, ApplicationStateType } from "../../types"

type CallbackType = (param?: string) => ApplicationActionsType
export type AsyncActionType = (param1: Dispatch<ApplicationActionsType, ApplicationStateType>,
  param2: () => ApplicationStateType) => Promise<string>

export default (
  url: string,
  body?: object,
  request?: CallbackType,
  receive?: CallbackType,
  error?: CallbackType,
  cont?: (param: ApplicationStateType) => boolean
): AsyncActionType => {
  // Turn parameters into constants so that Flow knows they will not change to null.
  const errorCallback = error;
  const receiveCallback = receive;

  return (
    dispatch: Dispatch<ApplicationActionsType, ApplicationStateType>,
    getState: () => ApplicationStateType
  ): Promise<string> => {
    // If we have a conditional fetching, check if we should continue.
    if (cont) {
      if (!cont(getState())) {
        return Promise.resolve("");
      }
    }

    // Action: Requesting data.
    if (request) {
      dispatch(request());
    }

    // Fetch
    let f = fetch(url, {
      ...body
    }).then((response) => response.text());

    // Action: Receiving data.
    if (receiveCallback) {
      f = f.then((response) => {
        dispatch(receiveCallback(response));
        return response;
      });
    }

    // Action: Error receiving data.
    if (errorCallback) {

      f = f.catch((error) => {
        const e =
          typeof error === "string"
            ? error
            : error.message ? error.message : "Script error";
        dispatch(errorCallback(e));
        return e;
      });
    }
    return f;
  };
};
