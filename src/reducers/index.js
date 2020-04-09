import { combineReducers } from 'redux';
import postReducer from './post-reducer';
import userReducer from './user-reducer';
import commentReducer from './comment-reducer';

export default combineReducers({
	posts: postReducer,
	users: userReducer,
	comment: commentReducer,
});
