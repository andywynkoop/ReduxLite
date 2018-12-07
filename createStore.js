class Store {
  constructor(rootReducer, preloadedState = {}, middlewares = []) {
    this.rootReducer = rootReducer;
    this.middlewares = middlewares;
    this.subscriptions = {};
    this.state = rootReducer(preloadedState, {type: "__initializeStore"}, this.subscriptions);
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const nextState = this.rootReducer(this.state, action, this.subscriptions);
    this.state = nextState;
  }

  subscribe(key, cb) {
    const keySubscriptions = this.subscriptions[key] || [];
    keySubscriptions.push(cb);
    this.subscriptions[key] = keySubscriptions;
  }
} 

export default (...args) => new Store(...args);