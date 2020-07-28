import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import styles from '../styles/calendar.module.css';

export default function CalendarHead({ type, title }) {
  const { targetDate, handleTargetChange } = useCalendar();

  return (
    <section className={styles.calendar_head}>
      {type === 'none' ? null : <button onClick={() => handleTargetChange(moment(targetDate).subtract(1, type).format())}>Previous</button>}
      <h3>{title}</h3>
      {type === 'none' ? null : <button onClick={() => handleTargetChange(moment(targetDate).add(1, type).format())}>Next</button>}
    </section>
  );
}

CalendarHead.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string
};
