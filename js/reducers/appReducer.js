import todosReducer from './todosReducer';
import visibilityReducer from './visibilityReducer';
import combineReducers from '../utils/combineReducers';

export default combineReducers({ todos: todosReducer, visibility: visibilityReducer });
