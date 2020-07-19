import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTargetDate } from '../selectors/calendarSelectors';
import { setTargetDate } from '../actions/calendarActions';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const targetDate = useSelector(getTargetDate);

  useEffect(() => {
    if(!targetDate) dispatch(setTargetDate(new Date))
  }, [])

  const handleTargetChange = (newDay) => {
    dispatch(setTargetDate(newDay))
  }

  return {
    targetDate,
    handleTargetChange
  };
};