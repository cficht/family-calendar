import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Link from 'next/link';
import { useCalendar } from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';

export default function day() {
  const [dayTarget, setDayTarget] = useState('');
  const { targetDate, handleTargetChange } = useCalendar();

  useEffect(() => {
    if(targetDate) setDayTarget(moment(targetDate).format('dddd, MMMM Do YYYY'));
  }, [targetDate]);

  return (
    <div>
      <Head>
        <title>Family Calendar: Day View</title>
      </Head>
      <main className="page-container">
        <h1>The Jefferson Family</h1>
        <Link href="/year"><a>Year</a></Link>
        <Link href="/month"><a>Month</a></Link>
        <div className="day-container">
          <CalendarHead type="days" title={dayTarget} />
          <div className="day-body">
            Events
          </div>
        </div>
      </main>
    </div>
  );
}
