import axios from 'axios';
import {
	FETCH_COMMENTS,
	NEW_COMMENT,
} from '../types';
import { URL, setAuthHeader } from '../utils';

export const fetchComments = () => dispatch => {
	axios
		.get(`${URL}/comments`)
		.then((comments) =>
			dispatch({
				type:  FETCH_COMMENTS,
				payload: comments.data
			})
		)
		.catch((err) => console.log(err));
};

export const createComment = postData => dispatch => {
	axios
		.post(`${URL}/comments`, postData, setAuthHeader)
		.then((comment) =>
			dispatch({
				type: NEW_COMMENT,
				payload: comment.data
			})
		)
		.catch((err) => console.log(err));
};

export const filteredComment = postId => dispatch => {
	axios
		.get(`${URL}/posts/${postId}/comments`, setAuthHeader)
		.then((comment) =>
			dispatch({
				type: FETCH_COMMENTS,
				payload: comment.data
			})
		)
		.catch((err) => console.log(err));
};
