import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import CalendarNodes from '../components/CalendarNodes';
import useUser from '../hooks/userHooks';
import PageLeft from '../components/PageLeft';
import Header from '../components/Header';

export default function month() {
  const [monthTarget, setMonthTarget] = useState('');
  const [displayDays, setDisplayDays] = useState([]);
  const { targetDate } = useCalendar();
  const { family, members, events, checkLog } = useUser();

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

  const eventNodes = events?.filter(event => {
    let match = false;
    if(moment(event.start).format('MM-YYYY') === moment(targetDate).format('MM-YYYY')) match = true;
    if(moment(event.end).format('MM-YYYY') === moment(targetDate).format('MM-YYYY')) match = true;
    return match;
  }).map(event => event);

  const dayNodes = displayDays.days?.map(day => {
    const eventMatch = eventNodes?.filter(event => {
      let match = false;
      if(moment(event.start).format('MMMM Do YYYY') === moment(day).format('MMMM Do YYYY')) match = true;
      if(moment(event.end).format('MMMM Do YYYY') === moment(day).format('MMMM Do YYYY')) match = true;
      return match;
    });
    return moment(day).month() === moment(monthTarget).month() ? <CalendarNodes className="calendar-node" key={day} node={day} type='/day' display='D' events={eventMatch}/> : <CalendarNodes className="other-day-node" key={day} node={day} type='/day' display='D' events={eventMatch}/>;
  });

  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
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
              <div className="calendar-body">
                {dayNodes}
              </div>
            </div>
          </div>
        </div>  
      </main>
    </div>
  );
}
