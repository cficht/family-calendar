import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import styles from '../styles/calendar.module.css';

export default function CalendarNodes({ className, node, type, display, events }) {
  const { handleTargetChange } = useCalendar();
  const { members } = useUser();
  
  const eventNodes = events?.map(event => { 
    const eventMember = members.find(member => member.id === event.memberID);
    return (
      <li key={event.id} style={{ backgroundColor: eventMember.color }} className={styles.month_event_list_item}>
        <h5>{event.name}</h5>
      </li>);
  });

  return (
    <div className={className}>
      <a onClick={() => handleTargetChange(moment(node).format(), type)}><h3>{moment(node).format(display)}</h3></a>
      <div className={styles.events_container}>
        <ul className={styles.event_list}>
          {eventNodes}
        </ul>
      </div>
    </div>
  );
}

CalendarNodes.propTypes = {
  className: PropTypes.string,
  node: PropTypes.string,
  type: PropTypes.string,
  display: PropTypes.string,
  events: PropTypes.array
};
