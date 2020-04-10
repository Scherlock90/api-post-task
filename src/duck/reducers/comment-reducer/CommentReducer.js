import { FETCH_COMMENTS, NEW_COMMENT } from '../../actions/types';

const initialState = {
    comment: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                comment: action.payload
            }
        case NEW_COMMENT:
            return {
                ...state,
                comment: [...state.comment, action.payload]
            }
        default:
            return state;
    }
}
