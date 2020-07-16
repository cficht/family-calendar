import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import DaySmall from '../components/DaySmall';

moment().format();

export default function month() {
  const [targetDate, setTargetDate] = useState('');
  const [displayDays, setDisplayDays] = useState([]);

  useEffect(() => {
    setTargetDate(moment('05-12-2020').format('MM-DD-YYYY'));
  }, []);

  useEffect(() => {
    if (!targetDate) return;
    const { years, months, date } = moment(targetDate).toObject()

    const monthDays = [...Array(moment((months + 1).toString()).daysInMonth())].map((_, i) => moment().year(years).month(months).date(i + 1).format());
    const beginning = moment(monthDays[0]).day();
    const end = (6 - moment(monthDays[monthDays.length - 1]).day());
    const preDays = [...Array(Number(beginning))].map((_, i) => moment(`${months + 1}-01-${years}`).subtract(beginning - i, 'days').format());
    const postDays = [...Array(Number(end))].map((_, i) => moment(`${months + 1}-${monthDays.length}-${years}`).add(i + 1, 'days').format());

    setDisplayDays({
      month: moment().month(months).format('MMMM'),
      days: [...preDays, ...monthDays, ...postDays],
    });
  }, [targetDate]);



const dayNodes = displayDays.days?.map(day => <DaySmall className="month-day" key={day} day={day}/>)

  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
      </Head>
      <main className="page-container">
        <h1>The Jefferson Family</h1>
        <div className="month-container">
          <div className="month-head">
            <h3>{displayDays.month ? displayDays.month : ''}</h3>
          </div>
          <div className="month-body" id={5}>
            {dayNodes}
          </div>
        </div>
      </main>
    </div>
  );
}
