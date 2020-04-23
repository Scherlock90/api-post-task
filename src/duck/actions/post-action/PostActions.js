import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from '../types';
import { URL, errorInformation, options } from '../utils';

export const fetchPosts = () => async (dispatch) => {
  const response = await axios(options('GET', `${URL}/posts`)).catch((err) =>
    errorInformation(err)
  );

  dispatch({
    type: FETCH_POSTS,
    payload: response.data,
  });
};

export const createPost = (postData) => async (dispatch) => {
  const response = await axios(
    options('POST', `${URL}/posts`, postData)
  ).catch((err) => errorInformation(err));

  dispatch({
    type: NEW_POST,
    payload: response.data,
  });
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
