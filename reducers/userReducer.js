import { SET_USER, SET_FAMILY } from '../actions/userActions';

const initialState = {
  user: '',
  family: '',
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_FAMILY:
      return { ...state, family: action.payload };
    default:
      return state;
  }
}
