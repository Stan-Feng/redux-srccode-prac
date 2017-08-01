import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import appReducer from './reducers/appReducer';

const middleware = applyMiddleware(promise(), thunk);

export default createStore(appReducer, middleware);
