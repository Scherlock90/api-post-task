/* eslint-disable no-console */
import { ajax } from 'rxjs/ajax';
import { FETCH_COMMENTS, NEW_COMMENT } from '../types';
import { URL, optionsAjax } from '../utils';
import { errorInformation } from '../../../utils/utils';

export const fetchComments = () => dispatch => {
  ajax(`${URL}/comments`).subscribe(
    ({ response }) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response,
      });
    },
    err => errorInformation(err),
  );
};

export const createComment = commentData => dispatch => {
  ajax(optionsAjax(`${URL}/comments`, 'POST', commentData)).subscribe(
    ({ response: { body, email, id, name, postId } }) => {
      dispatch({
        type: NEW_COMMENT,
        payload: {
          body,
          email,
          name,
          id: +id,
          postId: +postId,
        },
      });
    },
    err => errorInformation(err),
  );
};
