import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CalendarHead from '../components/CalendarHead';
import CalendarNodes from '../components/CalendarNodes';
import useCalendar from '../hooks/calendarHooks';
import styles from '../styles/calendar.module.css';

export default function Year() {
  const [yearTarget, setYearTarget] = useState('');
  const [displayMonths, setDisplayMonths] = useState([]);
  const { targetDate } = useCalendar();

  useEffect(() => {
    if(targetDate) setYearTarget(moment(targetDate).format('MM-DD-YYYY'));
  }, [targetDate]);

  useEffect(() => {
    if(!yearTarget) return;
    const { years } = moment(yearTarget).toObject();
    const yearMonths = [...Array(12)].map((_, i) => moment().year(years).month(i).format());

    setDisplayMonths({
      year: years,
      months: yearMonths
    });
  }, [yearTarget]);

  const monthNodes = displayMonths.months?.map(month => <CalendarNodes className={styles.calendar_node} key={month} node={month} type='Month' display='MMM'/>);

  return (
    <>
      <CalendarHead type='years' title={displayMonths.year ? displayMonths.year.toString() : ''}/>
      <div className={styles.calendar_outside}>
        <div className={styles.year_body}>
          {monthNodes}
        </div>   
      </div>
    </>
  );
}
