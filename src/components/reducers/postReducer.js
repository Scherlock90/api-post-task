import { FETCH_POSTS, NEW_POST, FETCH_COMMENTS } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	itemComent: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				items: action.payload
			};
		case NEW_POST:
			return {
				...state,
				item: action.payload
			};
		case FETCH_COMMENTS:
			return {
				...state,
				itemComent: action.payload
			}
		default:
			return state;
	}
}