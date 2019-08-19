import { 
	FETCH_POSTS, 
	NEW_POST, 
	DELETE_POST, 
	FETCH_COMMENTS, 
	NEW_COMMENT 
} from '../actions/types';

const initialState = {
	items: [],
	item: {},
	itemComent: [],
	itemNewComment: {}
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
		case DELETE_POST:
			return {
				...state,
				items: action.payload
			}
			
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
