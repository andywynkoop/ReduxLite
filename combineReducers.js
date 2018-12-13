export default config => (oldState, action, subscriptions) => {
  const nextState = {};
  let stateChanged = false;
  Object.keys(config).forEach(key => {
    const reducer = config[key];
    let oldSlice = oldState[key];
    const newSlice = reducer(oldSlice, action, subscriptions);
    if (!Object.is(oldSlice, newSlice)) {
      stateChanged = true;
    }
    nextState[key] = newSlice;
  });
  
  if (stateChanged) subscriptions.forEach(cb => cb(nextState));
  return nextState;
}