import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import CalendarHead from '../components/CalendarHead';
import UpdateEvent from '../components/UpdateEvent';

export default function Day() {
  const [dayTarget, setDayTarget] = useState('');
  const { targetDate } = useCalendar();
  const { members, events, handleDeleteEvent } = useUser();

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
          <h4>{event.name}</h4>
          <p>{event.description}</p>
          <p>{event.start}</p>
          <p>{event.end}</p>
          <UpdateEvent event={event}/>
          <button onClick={(e) => handleDeleteEvent(e, event.id)}>Delete Event</button>
        </section>
      </li>
    );
  });

  return (
    <>
      <CalendarHead type="days" title={dayTarget} />
      <div className="day-body">
        <ul className="event-list">
          {eventNodes}
        </ul>
      </div>
    </>
  );
}
