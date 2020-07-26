import React, { useState, useEffect } from 'react';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import CalendarHead from '../components/CalendarHead';
import CalendarNodes from '../components/CalendarNodes';

export default function Month() {
  const [monthTarget, setMonthTarget] = useState('');
  const [displayDays, setDisplayDays] = useState([]);
  const { targetDate } = useCalendar();
  const { events } = useUser();

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
    if(events.length < 1) return;
    let match = false;
    if(moment(event.start).format('MM-YYYY') === moment(targetDate).format('MM-YYYY')) match = true;
    if(moment(event.end).format('MM-YYYY') === moment(targetDate).format('MM-YYYY')) match = true;
    if(moment(event.start).format('MM-YYYY') === moment(targetDate).subtract(1, 'months').format('MM-YYYY')) match = true;
    if(moment(event.end).format('MM-YYYY') === moment(targetDate).subtract(1, 'months').format('MM-YYYY')) match = true;
    if(moment(event.start).format('MM-YYYY') === moment(targetDate).add(1, 'months').format('MM-YYYY')) match = true;
    if(moment(event.end).format('MM-YYYY') === moment(targetDate).add(1, 'months').format('MM-YYYY')) match = true;
    return match;
  })
  .map(event => {
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
  .flat();

  const dayNodes = displayDays.days?.map(day => {
    const eventMatch = eventNodes?.filter(event => {
      let match = false;
      if(moment(event.start).format('MMMM Do YYYY') === moment(day).format('MMMM Do YYYY')) match = true;
      return match;
    });
    return moment(day).month() === moment(monthTarget).month() ? <CalendarNodes className="calendar-node" key={day} node={day} type='Day' display='D' events={eventMatch}/> : <CalendarNodes className="other-day-node" key={day} node={day} type='Day' display='D' events={eventMatch}/>;
  });

  return (
    <>
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
    </>
  );
}