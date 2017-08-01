import React from 'react';
import { connect } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import ReactDOM from 'react-dom';
import TodoList from '../../components/TodoList/todoList';
import AddTodo from '../../components/TodoList/addTodo';
import FilterTodo from '../../components/TodoList/filterTodo';
import store from '../../store';


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
// const App = combineReducers({ todos: todosReducer,  visibility: visibilityReducer });
// const store = createStore(App);

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

export default TodoContainer;
