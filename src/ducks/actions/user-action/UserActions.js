import { ajax } from 'rxjs/ajax';

import { FETCH_USERS } from '../types';
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
