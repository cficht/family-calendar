import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import CalendarNodes from '../components/CalendarNodes';
import SignOut from '../components/SignOut';
import useUser from '../hooks/userHooks';
import Link from 'next/link';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';

export default function year() {
  const [yearTarget, setYearTarget] = useState('');
  const [displayMonths, setDisplayMonths] = useState([]);
  const { targetDate } = useCalendar();
  const { family, checkLog } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

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

  const monthNodes = displayMonths.months?.map(month => <CalendarNodes className="calendar-node" key={month} node={month} type='/month' display='MMM'/>);

  return (
    <div>
      <Head>
        <title>Family Calendar: Year View</title>
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
              <CalendarHead type='years' title={displayMonths.year ? displayMonths.year : ''}/>
              <div className="calendar-body">
                {monthNodes}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
