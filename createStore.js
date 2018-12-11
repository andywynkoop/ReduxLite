class Store {
  constructor(rootReducer, preloadedState = {}, appliedMiddlewares) {
    this.rootReducer = rootReducer;
    this.middleware = appliedMiddlewares;
    this.subscriptions = [];
    this.state = rootReducer(preloadedState, {type: "__initializeStore"}, this.subscriptions);
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.middleware(this, action => {
      const nextState = this.rootReducer(this.state, action, this.subscriptions);
      this.state = nextState;
    })(action);
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }
} 

export default (...args) => new Store(...args);