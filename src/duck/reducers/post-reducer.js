import {
	FETCH_POSTS,
	NEW_POST,
	DELETE_POST,
} from '../actions/types';

const initialState = {
	posts: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				posts: action.payload
			};
		case NEW_POST:
			return {
				...state,
				posts: [...state.posts, action.payload]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(item => item.id !== action.payload)
			}
		default:
			return state;
	}
}
