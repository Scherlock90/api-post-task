import { FETCH_POSTS, NEW_POST, FETCH_COMMENTS, NEW_COMMENT, DELETED_POST } from './types';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => (dispatch) => {
	axios
		.get(`${URL}/posts/`)
		.then((posts) =>
			dispatch({
				type: FETCH_POSTS,
				payload: posts.data
			})
		)
		.catch((err) => console.log(err));
};

export const createPost = (postData) => (dispatch) => {
	axios
		.post(`${URL}/posts`, postData, {
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then((post) =>
			dispatch({
				type: NEW_POST,
				payload: post.data
			})
		)
		.catch((err) => console.log(err));
};

export const deletedPost = (id) => (dispatch)=>  {
	axios
		.delete(`${URL}/${id}`, id, {
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then((post) =>
			dispatch({
				type: DELETED_POST,
				payload: post.data
			})
		)
		.catch((err) => console.log(err));
}


export const fetchComments = () => (dispatch) => {
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

export const createComment = (postData) => (dispatch) => {
	axios
		.post(`${URL}/comments`, postData, {
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then((comment) =>
			dispatch({
				type: NEW_COMMENT,
				payload: comment.data
			})
		)
		.catch((err) => console.log(err));
};