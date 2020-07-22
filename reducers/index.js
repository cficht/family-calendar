import { combineReducers } from 'redux';
import calendar from './calendarReducer';
import user from './userReducer';

export default combineReducers({
  calendar,
  user,
});
