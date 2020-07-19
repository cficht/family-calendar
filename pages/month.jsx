import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import DaySmall from '../components/DaySmall';
import { useSelector, useDispatch } from 'react-redux';
import { getTargetDate } from '../selectors/calendarSelectors';
import { useCalendar } from '../hooks/calendarHooks';
import { setTargetDate } from '../actions/calendarActions';

moment().format();

export default function month() {
  const [monthTarget, setMonthTarget] = useState('');
  const [displayDays, setDisplayDays] = useState([]);
  const { targetDate, handleTargetChange } = useCalendar();

  useEffect(() => {
    if(targetDate) setMonthTarget(moment(targetDate).format('MM-DD-YYYY'));
  }, [targetDate]);

  useEffect(() => {
    if (!monthTarget) return;
    const { years, months, date } = moment(monthTarget).toObject()

    const monthDays = [...Array(moment((months + 1).toString()).daysInMonth())].map((_, i) => moment().year(years).month(months).date(i + 1).format());
    const beginning = moment(monthDays[0]).day();
    const end = (6 - moment(monthDays[monthDays.length - 1]).day());
    const preDays = [...Array(Number(beginning))].map((_, i) => moment(`${months + 1}-01-${years}`).subtract(beginning - i, 'days').format());
    const postDays = [...Array(Number(end))].map((_, i) => moment(`${months + 1}-${monthDays.length}-${years}`).add(i + 1, 'days').format());

    setDisplayDays({
      month: moment().month(months).format('MMMM'),
      days: [...preDays, ...monthDays, ...postDays],
    });
  }, [monthTarget]);

  const dayNodes = displayDays.days?.map(day => <DaySmall className="month-day" key={day} day={day}/>)

  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
      </Head>
      <main className="page-container">
        {/* MAKE NAV */}
        <h1>The Jefferson Family</h1>
        {/* MAKE NAV */}
        <div className="month-container">
          <div className="month-head">
            <button onClick={() => handleTargetChange(moment(targetDate).subtract(1, 'months').format())}>Previous</button>
            <h3>{displayDays.month ? displayDays.month : ''}</h3>
            <button onClick={() => handleTargetChange(moment(targetDate).add(1, 'months').format())}>Next</button>
          </div>
          <div className="day-name">
            <div className="day-of-week"><h3>Sunday</h3></div>
            <div className="day-of-week"><h3>Monday</h3></div>
            <div className="day-of-week"><h3>Tuesday</h3></div>
            <div className="day-of-week"><h3>Wednesday</h3></div>
            <div className="day-of-week"><h3>Thursday</h3></div>
            <div className="day-of-week"><h3>Friday</h3></div>
            <div className="day-of-week"><h3>Saturday</h3></div>
          </div>
          <div className="month-body">
            {dayNodes}
          </div>
        </div>
      </main>
    </div>
  );
}
