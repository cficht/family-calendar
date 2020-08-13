import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import CalendarHead from '../components/CalendarHead';
import UpdateEvent from '../components/UpdateEvent';
import styles from '../styles/calendar.module.css';

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
    const actualEvent = events.find(realEvent => realEvent.id === event.id);
    return (
      <li key={event.id} style={{ backgroundColor: eventMember.color }} className={styles.event_list_item}>
        <section className={styles.event_list_detail}>
          <h3>{event.name}</h3>
          <h4>Description:</h4>
          <p>{event.description}</p>
          <h4>Start:</h4>
          <p>{moment(actualEvent.start).format('dddd, MMMM Do YYYY, h:mm a')}</p>
          <h4>End:</h4>
          <p>{moment(actualEvent.end).format('dddd, MMMM Do YYYY, h:mm a')}</p>
          <div className={styles.event_change}>
            <UpdateEvent event={event}/>
            <button onClick={(e) => handleDeleteEvent(e, event.id)}>Delete Event</button>
          </div>
        </section>
      </li>
    );
  });

  return (
    <>
      <CalendarHead type="days" title={dayTarget} />
      <div className={styles.day_body}>
        <ul className={styles.event_list}>
          {eventNodes}
        </ul>
      </div>
    </>
  );
}
