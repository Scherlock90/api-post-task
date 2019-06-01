import { FETCH_POSTS, NEW_POST } from './types';
import axios from 'axios';

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
