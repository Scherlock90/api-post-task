import axios from 'axios';
import { FETCH_COMMENTS, NEW_COMMENT } from '../types';
import { URL, Options } from '../utils';

export const fetchComments = () => async dispatch => {
	const response = await axios(Options('GET', `${URL}/comments`))
		.catch((err) => console.log(err));

	dispatch({
		type: FETCH_COMMENTS,
		payload: response.data
	})
};

export const createComment = commentData => async dispatch => {
	const response = await axios(Options('POST', `${URL}/comments`, commentData))
		.catch((err) => console.log(err));

	dispatch({
		type: NEW_COMMENT,
		payload: response.data
	})
};

export const filteredComment = postId => async dispatch => {
	const response = await axios(Options('GET', `${URL}/posts/${postId}/comments`))
		.catch((err) => console.log(err));

	dispatch({
		type: FETCH_COMMENTS,
		payload: response.data
	})
};
