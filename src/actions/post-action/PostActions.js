import axios from 'axios';
import {
	FETCH_POSTS,
	NEW_POST,
} from '../types';
import { URL, setAuthHeader } from '../utils';


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
		.delete(`${URL}/posts/${id}`, setAuthHeader)
		.catch((err) => console.log(err));

		dispatch({
			type: 'SUCCESS',
			status: 'success', response: 'Success'
		})
}


export const filteredPosts = userId => dispatch => {
	axios
		.get(`${URL}/users/${userId}/posts`, setAuthHeader)
		.then((comment) =>
			dispatch({
				type: FETCH_POSTS,
				payload: comment.data
			})
		)
		.catch((err) => console.log(err));
};

