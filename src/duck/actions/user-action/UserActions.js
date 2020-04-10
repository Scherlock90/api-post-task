import axios from 'axios';
import { FETCH_USERS } from '../types';
import { URL, Options } from '../utils';

export function fetchUsers () {
	return async function action (dispatch) {
		const request = await axios(Options('GET', `${URL}/users`));

		dispatch({
			type: FETCH_USERS,
			payload: request.data
		})
	}
}
