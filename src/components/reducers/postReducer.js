import { FETCH_POSTS, NEW_POST, DELETED_POST, FETCH_COMMENTS, NEW_COMMENT } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	itemComent: [],
	itemNewComment: {},
	deletedPost: []
};

export default function (state = initialState, action) {
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
		case DELETED_POST:
			const newItems = state.items.filter(p => p.id !== action.payload);
        return {
            ...state,
            items: [ ...newItems ],
        };
		case FETCH_COMMENTS:
			return {
				...state,
				itemComent: action.payload
			}
		case NEW_COMMENT:
			return {
				...state,
				itemNewComment: action.payload
			}
		default:
			return state;
	}
}
