import { INITIAL, PENDING, SUCCESS } from '../../actions/types';

const initialState = {
  notification: '',
};

export default function (state = initialState, { type }) {
  switch (type) {
    case PENDING:
      return {
        ...state,
        notification: 'Loading...',
      };
    case SUCCESS:
      return {
        ...state,
        notification: 'Success',
      };
    case INITIAL:
      return {
        ...state,
        notification: '',
      };
    default:
      return state;
  }
}
