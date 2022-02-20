import { Store } from "constants/types";

export function createStore(rootReducer: any, initialState: any): any {
  let state = rootReducer(initialState, { type: "__INIT__" });
  const subscribers: any[] = [];

  return {
    dispatch(action: any) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },
    substribe(callback: Function) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    },
  };
}
