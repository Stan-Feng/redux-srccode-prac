const createStore = (reducer) => {
  let _state;
  const _listeners = [];

  const getState = () => Object.assign({}, _state);

  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    _listeners.push(listener);
  }

  dispatch({}); // Render Initial State

  return { getState, dispatch, subscribe };
};

export default createStore;
