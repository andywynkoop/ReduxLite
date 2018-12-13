class Store {
  constructor(rootReducer, preloadedState = {}, appliedMiddlewares) {
    this.rootReducer = rootReducer;
    this.middleware = appliedMiddlewares;
    this.subscriptions = [];
    this.state = rootReducer(preloadedState, {type: "__initializeStore"}, this.subscriptions);
    this.getState = this.getState.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getState() {
    return Object.assign({}, this.state);
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