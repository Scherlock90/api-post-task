import { combineReducers } from 'redux';
import postReducer from './post-reducer/PostReducer';
import userReducer from './user-reducer/UserReducer';
import commentReducer from './comment-reducer/CommentReducer';

export default combineReducers({
  posts: postReducer,
  users: userReducer,
  comment: commentReducer,
});
