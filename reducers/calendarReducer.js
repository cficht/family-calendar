import { SET_TARGET_DATE } from '../actions/calendarActions';

const initialState = {
  targetDate: '',
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_TARGET_DATE:
      return { ...state, targetDate: action.payload };
    default:
      return state;
  }
}
