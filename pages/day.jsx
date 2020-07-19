import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import moment from 'moment';
import { useCalendar } from '../hooks/calendarHooks';
import Link from 'next/link';

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
        {/* MAKE NAV */}
        <h1>The Jefferson Family</h1>
        <Link href="/month"><a>Month</a></Link>
        {/* MAKE NAV */}
        <div className="day-container">
          <div className="day-head">
            <button onClick={() => handleTargetChange(moment(targetDate).subtract(1, 'days').format())}>Previous</button>
            <h3>{dayTarget}</h3>
            <button onClick={() => handleTargetChange(moment(targetDate).add(1, 'days').format())}>Next</button>
          </div>
          <div className="day-body">
            Events
          </div>
        </div>
      </main>
    </div>
  )
}