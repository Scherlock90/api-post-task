import axios from 'axios';
import { FETCH_COMMENTS, NEW_COMMENT } from '../types';
import { URL, options } from '../utils';

export const fetchComments = () => async dispatch => {
	const response = await axios(options('GET', `${URL}/comments`))
		.catch((err) => console.log(err));

	dispatch({
		type: FETCH_COMMENTS,
		payload: response.data
	})
};

export const createComment = commentData => async dispatch => {
	const response = await axios(options('POST', `${URL}/comments`, commentData))
		.catch((err) => console.log(err));

	dispatch({
		type: NEW_COMMENT,
		payload: response.data
	})
};

export const filteredComment = postId => dispatch => {
	axios(options('GET', `${URL}/comments?postId=${postId}`))
		.then(response => dispatch({
			type: FETCH_COMMENTS,
			payload: response.data
		}))
		.catch((err) => console.log(err));
};
