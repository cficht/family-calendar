import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';

moment().format();

export default function month() {
  const [targetDate, setTargetDate] = useState('');
  const [displayDays, setDisplayDays] = useState([]);

  useEffect(() => {
    setTargetDate(moment().format('MM-DD-YYYY'));
    setDisplayDays({
      month: moment().month(moment().month()).format('MMMM'),
      days: [],
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
      </Head>
      <main className="page-container">
        <h1>The Jefferson Family</h1>
        <div className="month-container">
          <div className="month-head">
            <h3>{displayDays.month}</h3>
          </div>
          <div className="month-body">
            Eventual Days
          </div>
        </div>
      </main>
    </div>
  );
}
