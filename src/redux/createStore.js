export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { typ: '__INIT__' });
  const subscribers = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub());
    },
    substribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    }
  };
}
