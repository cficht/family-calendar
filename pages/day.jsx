import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Link from 'next/link';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import SignOut from '../components/SignOut';
import useUser from '../hooks/userHooks';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';
import AddEvent from '../components/AddEvent';

export default function day() {
  const [dayTarget, setDayTarget] = useState('');
  const { targetDate } = useCalendar();
  const { family, checkLog } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

  useEffect(() => {
    if(targetDate) setDayTarget(moment(targetDate).format('dddd, MMMM Do YYYY'));
  }, [targetDate]);

  return (
    <div>
      <Head>
        <title>Family Calendar: Day View</title>
      </Head>
      <main className="page-container">
        <div className="page-header">
          <Header family={family}/>
        </div>
        <div className="page-body">
          <div className="page-left">
            <PageLeft />
          </div>
          <div className="page-right">
            <div className="calendar-container">
              <CalendarHead type="days" title={dayTarget} />
              <div className="day-body">
            Events
              </div>
              <AddEvent />
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}
