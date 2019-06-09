import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {persistData} from '../components/LocalStorage';

function thunkMiddleware({ dispatch, getState }) {
	return next => action =>
	  typeof action === 'function' ?
		action(dispatch, getState) :
		next(action);
  }

const initialState = {};
const middleware = [ thunk ];
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunkMiddleware, persistData),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
