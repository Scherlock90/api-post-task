import axios from 'axios';
import {
	FETCH_POSTS,
	FETCH_USERS,
	FETCH_COMMENTS,
	NEW_POST,
	NEW_COMMENT,
	DELETE_POST
} from './types';
import { URL, setAuthHeader } from './utils';


export const fetchPosts = () => dispatch => {
	axios
		.get(`${URL}/posts/`, setAuthHeader)
		.then((posts) =>
			dispatch({
				type: FETCH_POSTS,
				payload: posts.data
			})
		)
		.catch((err) => console.log(err));
};

export const createPost = postData => dispatch => {
	axios
		.post(`${URL}/posts`, postData, setAuthHeader)
		.then((post) =>
			dispatch({
				type: NEW_POST,
				payload: post.data
			})
		)
		.catch((err) => console.log(err));
};

export const deletePost = id => dispatch =>  {
	axios
		.delete(`${URL}/${id}`, id, setAuthHeader)
		.then((post) =>
			dispatch({
				type: DELETE_POST,
				payload: post.data
			})
		)
		.catch((err) => console.log(err));
}


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
