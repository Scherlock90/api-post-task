import axios from 'axios';
import { FETCH_USERS } from '../types';
import { URL } from '../utils';


export function fetchUsers () {
	return function action (dispatch) {

		const request = axios({
			method: 'GET',
			url: `${URL}/users`,
		});

		return request.then(users => {
			dispatch({
			type: FETCH_USERS,
			payload: users.data
		})});
	}
}
