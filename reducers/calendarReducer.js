import { SET_TARGET_DATE, SET_VIEW } from '../actions/calendarActions';

const initialState = {
  targetDate: '',
  view: 'Month'
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_TARGET_DATE:
      return { ...state, targetDate: action.payload };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
}
