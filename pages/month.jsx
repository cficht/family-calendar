import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import CalendarNodes from '../components/CalendarNodes';
import Link from 'next/link';
import SignOut from '../components/SignOut';
import useUser from '../hooks/userHooks';

export default function month() {
  const [monthTarget, setMonthTarget] = useState('');
  const [displayDays, setDisplayDays] = useState([]);
  const { targetDate } = useCalendar();
  const { family, checkLog } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

  useEffect(() => {
    if(targetDate) setMonthTarget(moment(targetDate).format('MM-DD-YYYY'));
  }, [targetDate]);

  useEffect(() => {
    if(!monthTarget) return;
    const { years, months } = moment(monthTarget).toObject();

    const monthDays = [...Array(moment((months + 1).toString()).daysInMonth())].map((_, i) => moment().year(years).month(months).date(i + 1).format());
    const beginning = moment(monthDays[0]).day();
    const end = (6 - moment(monthDays[monthDays.length - 1]).day());
    const preDays = [...Array(Number(beginning))].map((_, i) => moment(`${months + 1}-01-${years}`).subtract(beginning - i, 'days').format());
    const postDays = [...Array(Number(end))].map((_, i) => moment(`${months + 1}-${monthDays.length}-${years}`).add(i + 1, 'days').format());

    setDisplayDays({
      month: moment().year(years).month(months).format('MMMM YYYY'),
      days: [...preDays, ...monthDays, ...postDays],
    });
  }, [monthTarget]);

  const dayNodes = displayDays.days?.map(day => moment(day).month() === moment(monthTarget).month() ? <CalendarNodes className="calendar-node" key={day} node={day} type='/day' display='D'/> : <CalendarNodes className="other-day-node" key={day} node={day} type='/day' display='D'/>);

  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
      </Head>
      <main className="page-container">
        <h1>The {family.name} Family</h1>
        <Link href="/year"><a>Year</a></Link>
        <div className="month-container">
          <CalendarHead type='months' title={displayDays.month ? displayDays.month : ''}/>
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
      <footer className="footer">
        <SignOut />
      </footer>
    </div>
  );
}
