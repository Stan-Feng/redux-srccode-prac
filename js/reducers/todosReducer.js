import todoReducer from './todoReducer';

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        todoReducer({}, action)
      ];
    }
    case 'TOGGLE_TODO':{
      return state.map(todo => todoReducer(todo, action));
    }
    default: {
      return state;
    }
  }
};

export default todosReducer;
