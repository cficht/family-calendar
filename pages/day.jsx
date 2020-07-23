import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import useUser from '../hooks/userHooks';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';
import AddEvent from '../components/AddEvent';

export default function day() {
  const [dayTarget, setDayTarget] = useState('');
  const { targetDate } = useCalendar();
  const { family, members, events, checkLog, handleDeleteEvent } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

  useEffect(() => {
    if(targetDate) setDayTarget(moment(targetDate).format('dddd, MMMM Do YYYY'));
  }, [targetDate]);

  const eventNodes = events?.filter(event => {
    let match = false;
    if(moment(event.start).format('dddd, MMMM Do YYYY') === moment(targetDate).format('dddd, MMMM Do YYYY')) match = true;
    if(moment(event.end).format('dddd, MMMM Do YYYY') === moment(targetDate).format('dddd, MMMM Do YYYY')) match = true;
    return match;
  }).map(event => {
    const eventMember = members.find(member => member.id === event.memberID);
    return (
      <li key={event.id} style={{ backgroundColor: eventMember.color }} className="event-list-item">
        <section className="event-list-detail">
          <h3>{event.name}</h3>
          <h5>{eventMember.name}</h5>
          <p>{event.description}</p>
          <p>{event.start}</p>
          <p>{event.end}</p>
          <button onClick={(e) => handleDeleteEvent(e, event.id)}>Delete Event</button>
        </section>
      </li>
    );
  });

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
                <ul className="event-list">
                  {eventNodes}
                </ul>
              </div>
              <AddEvent />
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}
