import { SET_USER, SET_FAMILY, ADD_MEMBER } from '../actions/userActions';

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
    case ADD_MEMBER:
      return { ...state, family: { ...state.family, members: { ...state.family.members, items: [...state.family.members.items, action.payload] } } };
    default:
      return state;
  }
}
