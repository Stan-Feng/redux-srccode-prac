import React from 'react';
// import { combineReducers, createStore } from 'redux';
import ReactDOM from 'react-dom';
import TodoList from './todoList';
import AddTodo from './addTodo';
import FilterTodo from './filterTodo';

const createStore = (reducer) => {
  let _state;
  const _listeners = [];

  const getState = () => _state;

  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    _listeners.push(listener);
  };

  dispatch({}); // Render Initial State

  return { getState, dispatch, subscribe };
};
// state -> the property of single todo
const todoReducer =  (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      } else {
        return {
          ...state,
          completed: !state.completed
        };
      }
    default:
      return state;
  }
};

// state -> the whole todos
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer({}, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => todoReducer(todo, action));
    default:
      return state;
  }
};

const visibilityReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY':
      return action.filter;
    default:
      return state;
  }
};

// const appReducer = (state = {}, action) => {
//   return {
//     todos: todosReducer(state.todos, action),
//     visibility: visibilityReducer(state.visibility, action)
//   };
// }

// const { combineReducers } = Redux;
// Redux provide combineReducers function
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      }, {});
  };
};


// Get Visible Todos
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

// which means the todos state of the whole app will be managed by the todosReducer
const App = combineReducers({ todos: todosReducer,  visibility: visibilityReducer });
const store = createStore(App);

const { Component } = React;

let nextTodoId = 0;
class TodoContainer extends Component {
  render () {
    const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibility);
    return (
      <div>

        <AddTodo onAddClick = { text => {
          store.dispatch({ type: 'ADD_TODO', id: nextTodoId++, text });
        }}/>

        <TodoList todos = {visibleTodos} onTodoClick = { id => store.dispatch({type: 'TOGGLE_TODO', id})} />

        <FilterTodo onFilterClick = { (filter) => {
          store.dispatch({ type: 'SET_VISIBILITY', filter });
        }}/>

      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<TodoContainer {...store.getState()} />, document.getElementById('root'));
};

store.subscribe(render);
render(); // Render Initial State;
