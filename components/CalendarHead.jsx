import React from 'react';
import moment from 'moment';
import { useCalendar } from '../hooks/calendarHooks';

export default function CalendarHead({ type, title }) {
  const { targetDate, handleTargetChange } = useCalendar();

  return (
    <div className="calendar-head">
      <button onClick={() => handleTargetChange(moment(targetDate).subtract(1, type).format())}>Previous</button>
      <h3>{title}</h3>
      <button onClick={() => handleTargetChange(moment(targetDate).add(1, type).format())}>Next</button>
    </div>
  )
}
