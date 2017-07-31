import React, { Component } from 'react';
// Presentational Component which does not specify any specific operation
class Todo extends Component {
  render () {
    const { text, onClick, completed } = this.props;

    return (
      <li onClick = { onClick } style = { {textDecoration: completed ? 'line-through' : 'none'} }>
        {text}
      </li>
    );
  }
}

export default Todo;
