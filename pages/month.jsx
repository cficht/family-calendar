import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';

moment().format();

export default function month() {
  const [targetDate, setTargetDate] = useState('');
  const [displayDays, setDisplayDays] = useState([]);

  useEffect(() => {
    setTargetDate(moment('02-12-2012').format('MM-DD-YYYY'));
  }, []);

  useEffect(() => {
    if (!targetDate) return;
    const { years, months, date } = moment(targetDate).toObject()

    // REFACTOR
    const monthDays = new Array(moment((months + 1).toString()).daysInMonth());
    for (let i = 0; i < monthDays.length; i++) monthDays[i] = moment().year(years).month(months).date(i + 1).format("dddd, MMMM Do YYYY");
    
    setDisplayDays({
      month: moment().month(months).format('MMMM'),
      days: monthDays,
    });
  }, [targetDate]);

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
          <div className="month-body">
            Eventual Days
          </div>
        </div>
      </main>
    </div>
  );
}
