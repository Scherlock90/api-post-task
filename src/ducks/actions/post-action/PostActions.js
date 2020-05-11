import { ajax } from 'rxjs/ajax';

import { URL, optionsAjax } from '../utils';
import { errorInformation } from '../../../utils/utils';
import { DELETE_POST, FETCH_POSTS, NEW_POST } from '../types';

export const fetchPosts = () => (dispatch) => {
  ajax(`${URL}/posts`).subscribe(
    ({ response }) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response,
      });
    },
    (err) => errorInformation(err)
  );
};

export const createPost = (postData) => (dispatch) => {
  ajax(optionsAjax(`${URL}/posts`, 'POST', postData)).subscribe(
    ({ response: { userId, body, id, title } }) => {
      dispatch({
        type: NEW_POST,
        payload: {
          title,
          body,
          userId: +userId,
          id: +id,
        },
      });
    },
    (err) => errorInformation(err)
  );
};

export const deletePost = (id) => (dispatch) => {
  ajax(optionsAjax(`${URL}/posts/${id}`, 'DELETE')).subscribe(
    (response) => {
      dispatch({
        type: DELETE_POST,
        payload: id || response,
      });
    },
    (err) => errorInformation(err)
  );
};
