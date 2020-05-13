import { FETCH_SINGLE_USERS, FETCH_USERS, } from '../../actions/types';

const initialState = {
  users: [],
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_SINGLE_USERS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
