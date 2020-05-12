import { ERROR, DELETE, INITIAL, PENDING, SUCCESS } from '../../actions/types';

const initialState = {
  notification: '',
};

export default function (state = initialState, { type }) {
  switch (type) {
    case INITIAL:
      return {
        ...state,
        notification: '',
      };
    case PENDING:
      return {
        ...state,
        notification: 'Loading...',
      };
    case DELETE:
      return {
        ...state,
        notification: 'Removing...',
      };
    case SUCCESS:
      return {
        ...state,
        notification: 'Success',
      };
    case ERROR:
      return {
        ...state,
        notification: 'Error! Try again',
      };
    default:
      return state;
  }
}
