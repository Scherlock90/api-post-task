import { FETCH_POSTS, NEW_POST, FETCH_USERS } from './types';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => (dispatch) => {
	axios
		.get(' https://jsonplaceholder.typicode.com/users')
		.then((posts) =>
			dispatch({
				type:  FETCH_USERS,
				payload: posts.data
			})
		)
		.catch((err) => {
			console.log(err);
		});
};

export const fetchPosts = () => (dispatch) => {
	axios
		.get('https://jsonplaceholder.typicode.com/posts')
		.then((posts) =>
			dispatch({
				type: FETCH_POSTS,
				payload: posts.data
			})
		)
		.catch((err) => {
			console.log(err);
		});
};

export const createPost = (postData) => (dispatch) => {
	axios
		.post('https://jsonplaceholder.typicode.com/posts', postData, {
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
