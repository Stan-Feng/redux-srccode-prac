import React from 'react';
import ReactDOM from 'react-dom';
import TodoContainer from './containers/TodoList/todos.js';
import store from './store';
import { Provider } from 'react-redux';





const render = () => {
  ReactDOM.render(
    <Provider store = {store} >
      <TodoContainer {...store.getState()} />
    </Provider>, document.getElementById('root'));
};

store.subscribe(render);
render(); // Render Initial State;
