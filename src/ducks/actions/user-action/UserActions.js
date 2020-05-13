import { ajax } from 'rxjs/ajax';

import { FETCH_SINGLE_USERS, FETCH_USERS, } from '../types';
import { URL } from '../utils';
import { errorInformation } from '../../../utils/utils';

export const fetchUsers = () => dispatch => {
  ajax(`${URL}/users`).subscribe(
    ({ response }) => {
      dispatch({
        type: FETCH_USERS,
        payload: response,
      });
    },
    err => errorInformation(err),
  );
};

export const fetchSingleUser = userId => dispatch => {
  ajax(`${URL}/users/${userId}`).subscribe(
    ({ response }) => {
      dispatch({
        type: FETCH_SINGLE_USERS,
        payload: response,
      });
    },
    err => errorInformation(err),
  );
};
