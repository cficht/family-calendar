import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import moment from 'moment';

export default function day() {
  const [targetDate, setTargetDate] = useState('');

  const router = useRouter()
  const { date } = router.query

  useEffect(() => {
    setTargetDate(moment(date).format('dddd, MMMM Do YYYY'));
  }, [date]);

  return (
    <div>
      <Head>
        <title>Family Calendar: Day View</title>
      </Head>
      <main className="page-container">
        <h1>The Jefferson Family</h1>
        <div className="day-container">
          <div className="day-head">
            <h3>{targetDate}</h3>
          </div>
          <div className="day-body">
            Events
          </div>
        </div>
      </main>
    </div>
  )
}