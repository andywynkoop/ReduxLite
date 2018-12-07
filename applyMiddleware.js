export default (...middlewares) => (store, cb) => action => {
  const invokeNextMiddleware = (action) => {
    nextMiddleware = middlewares.shift();
    if (!nextMiddleware) {
      return cb(action);
    }
    return nextMiddleware(store)(invokeNextMiddleware)(action);
  }
  return invokeNextMiddleware(action);
}
