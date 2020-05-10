/* eslint-disable no-console */
import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from '../types';
import { URL, options, optionsAjax } from '../utils';
import { errorInformation } from '../../../utils/utils';
import { ajax } from 'rxjs/ajax';

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
          title: title,
          userId: +userId,
          body: body,
          id: +id,
        },
      });
    },

    (err) => errorInformation(err)
  );
};

export const deletePost = (id) => async (dispatch) => {
  await axios(options('DELETE', `${URL}/posts/${id}`)).catch((err) =>
    errorInformation(err)
  );

  dispatch({
    type: 'SUCCESS',
    status: 'success',
    response: 'Success',
  });
};

export const filteredPosts = (userId) => async (dispatch) => {
  const response = await axios(
    options('GET', `${URL}/users/${userId}/posts`)
  ).catch((err) => errorInformation(err));

  dispatch({
    type: FETCH_POSTS,
    payload: response.data,
  });
};
