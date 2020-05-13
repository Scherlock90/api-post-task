/* eslint-disable no-console */
import { ajax } from 'rxjs/ajax';

import { URL, optionsAjax } from '../utils';
import { errorInformation } from '../../../utils/utils';
import {
  DELETE,
  DELETE_POST,
  ERROR,
  FETCH_POSTS,
  INITIAL,
  NEW_POST,
  PENDING,
  SUCCESS,
} from '../types';
import { notification } from '../common-action/index';

export const fetchPosts = userId => dispatch => {
  ajax(`${URL}/users/${userId}/posts`).subscribe(
    ({ response }) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response,
      });
    },
    err => errorInformation(err),
  );
};

export const createPost = postData => dispatch => {
  notification(dispatch, PENDING);

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

      notification(dispatch, SUCCESS);
      setTimeout(() => notification(dispatch, INITIAL), 2000);
    },
    err => {
      notification(dispatch, ERROR);
      setTimeout(() => notification(dispatch, INITIAL), 5000);
      errorInformation(err);
    },
  );
};

export const deletePost = id => dispatch => {
  notification(dispatch, DELETE);

  ajax(optionsAjax(`${URL}/posts/${id}`, 'DELETE')).subscribe(
    response => {
      dispatch({
        type: DELETE_POST,
        payload: id || response,
      });

      notification(dispatch, SUCCESS);
      setTimeout(() => notification(dispatch, INITIAL), 2000);
    },
    err => {
      notification(dispatch, ERROR);
      setTimeout(() => notification(dispatch, INITIAL), 5000);
      errorInformation(err);
    },
  );
};
