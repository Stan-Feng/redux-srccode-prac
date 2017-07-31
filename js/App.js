import React from 'react';
import ReactDOM from 'react-dom';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let _state;
  const _listeners = [];

  const getState = () => _state;

  // Dispatch action and notify all listeners
  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    _listeners.push(listener);
  };

  dispatch({}); // Render Initial State

  return { getState, dispatch, subscribe };
}

const counterStore = createStore(counterReducer);

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{ value }</h1>
    <button onClick = { onIncrement }>+</button>
    <button onClick = { onDecrement }>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(<Counter value = { counterStore.getState() }
                       onIncrement = { () => counterStore.dispatch({ type: 'INCREMENT' }) }
                       onDecrement = { () => counterStore.dispatch({ type: 'DECREMENT' }) }/>
              ,document.getElementById('root'));
};
counterStore.subscribe(render);

render();
