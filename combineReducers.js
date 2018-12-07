export default config => (oldState, action, subscriptions) => {
  const nextState = {};
  Object.keys(config).forEach(key => {
    const reducer = config[key];
    const oldSlice = oldState[key];
    const newSlice = reducer(oldSlice, action, subscriptions);
    if (!Object.is(oldSlice, newSlice) && subscriptions.hasOwnProperty(key)) {
      subscriptions[key].forEach(cb => cb(newSlice));
    }
    nextState[key] = newSlice;
  });

  return nextState;
}