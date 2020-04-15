import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from '../types';
import { URL, Options } from '../utils';

export const fetchPosts = () => async dispatch => {
	const response = await axios(Options('GET', `${URL}/posts/`))
		.catch((err) => console.log(err));

		await dispatch({
			type: FETCH_POSTS,
			payload: response.data
		})
};

export const createPost = postData => async dispatch => {
	const response = await axios(Options('POST', `${URL}/posts`, postData))
		.catch((err) => console.log(err));

		await dispatch({
			type: NEW_POST,
			payload: response.data
		})
};

export const deletePost = id => async dispatch =>  {
	await axios(Options('DELETE', `${URL}/posts/${id}`))
		.catch((err) => console.log(err));

		await dispatch({
			type: 'SUCCESS',
			status: 'success', response: 'Success'
		})
}


export const filteredPosts = userId => async dispatch => {
	const response = await axios(Options('GET', `${URL}/users/${userId}/posts`))
		.catch((err) => console.log(err));

		await dispatch({
			type: FETCH_POSTS,
			payload: response.data
		})
};

