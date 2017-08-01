import React, { Component } from 'react';
import Todo from './todo';

class TodoList extends Component {

  render () {
    const { todos, onTodoClick } = this.props;

    return (
      <ul>
        {todos.map(todo => {
          return <Todo key = {todo.id} {...todo} onClick = { () => onTodoClick(todo.id) } />
        })}
      </ul>
    );
  }
}

export default TodoList;
