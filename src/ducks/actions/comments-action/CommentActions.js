/* eslint-disable no-console */
import { ajax } from 'rxjs/ajax';
import { ERROR, FETCH_COMMENTS, INITIAL, NEW_COMMENT, PENDING, SUCCESS } from '../types';
import { URL, optionsAjax } from '../utils';
import { errorInformation } from '../../../utils/utils';
import { notification } from '../common-action/index';

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
  notification(dispatch, PENDING);

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
