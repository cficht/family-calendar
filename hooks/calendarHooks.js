import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTargetDate, getView } from '../selectors/calendarSelectors';
import { setTargetDate, setView } from '../actions/calendarActions';

const useCalendar = () => {
  const dispatch = useDispatch();
  const targetDate = useSelector(getTargetDate);
  const view = useSelector(getView);

  useEffect(() => {
    if(!targetDate) dispatch(setTargetDate(new Date()));
  }, []);

  const handleTargetChange = (newDay, newView) => {
    dispatch(setTargetDate(newDay));
    if(newView) dispatch(setView(newView));
  };

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  }

  return {
    targetDate,
    view,
    handleTargetChange,
    handleViewChange
  };
};

export default useCalendar;
