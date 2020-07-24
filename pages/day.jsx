import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import CalendarHead from '../components/CalendarHead';
import useUser from '../hooks/userHooks';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';
import AddEvent from '../components/AddEvent';
import Link from 'next/link';

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

  const eventNodes = events?.map(event => {
    let inbetween;
    if(moment(event.start).format('MMMM Do YYYY') !== moment(event.end).format('MMMM Do YYYY')) {
      const start = moment(event.start);
      const end = moment(event.end);
      inbetween = end.diff(start, 'days');
      const inbetweenDays = [...Array(Number(inbetween + 1))].map((_, i) => {
        return { ...event, start: moment(event.start).add(i, 'days').format() };
      });
      return inbetweenDays;
    } else return event;
  })
  .flat()
  .filter(event => {
    let match = false;
    if(moment(event.start).format('dddd, MMMM Do YYYY') === moment(targetDate).format('dddd, MMMM Do YYYY')) match = true;
    return match;
  })
  .map(event => {
    const eventMember = members.find(member => member.id === event.memberID);
    return (
      <li key={event.id} style={{ backgroundColor: eventMember.color }} className="event-list-item">
        <section className="event-list-detail">
          <h5>{eventMember.name}</h5>
          <p>{event.description}</p>
          <p>{event.start}</p>
          <p>{event.end}</p>
          <Link href="/events/[id]" as={`/events/${event.id}`}><button>Update Event</button></Link>
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
              {members?.length > 0 ? <AddEvent /> : null}
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}
