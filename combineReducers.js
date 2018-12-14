export default config => {
  const _reducer = (oldState, action, subscriptions) => {
    const nextState = {};
    let stateChanged = false;
    Object.keys(config).forEach(key => {
      const reducer = config[key];
      let oldSlice;
      if (action.type === "__initializeStore" && oldState[key] === undefined) {
        if (reducer.type === "combine") {
          oldSlice = reducer({}, action);
        } else {
          let args = [, action];
          oldSlice = reducer(...args);
        }
      } else {
        oldSlice = oldState[key];
      }
      const newSlice = reducer(oldSlice, action, []);
      if (!Object.is(oldSlice, newSlice)) {
        stateChanged = true;
      }
      nextState[key] = newSlice;
    });

    if (stateChanged) subscriptions.forEach(cb => cb(nextState));
    return nextState;
  }
  _reducer.type = "combine";
  return _reducer;
}