import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import useUser from '../hooks/userHooks';
import { customStyles } from '../utils/helpers';

Modal.setAppElement('body');

export default function UpdateEvent({ event }) {
  const { members, handleUpdateEvent, handleDeleteEvent } = useUser();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventMember, setEventMember] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  useEffect(() => {
    if(!event?.id) return;

    const startDate = moment(event?.start).format('YYYY-MM-DD');
    const startTime = moment(event?.start).format('HH:mm');
    const endDate = moment(event?.end).format('YYYY-MM-DD');
    const endTime = moment(event?.end).format('HH:mm');

    setEventName(event.name);
    setEventDescription(event.description);
    setEventMember(event.memberID);
    setEventStartDate(startDate);
    setEventStartTime(startTime);
    setEventEndDate(endDate);
    setEventEndTime(endTime);
  }, [event]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const memberNodes = members?.map(member => <option value={member.id} key={member.id}>{member.name}</option>);

  return (
    <section>
      <button onClick={openModal}>Update Event</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Event Modal">
        <section className="add-event-box">
          <h3>Update Event:</h3>
          <form onSubmit={e => {
            handleUpdateEvent(e, event.id, eventName, eventDescription, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventMember, event.memberID);
            closeModal();
          }}>
            <label>Name:<input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}/></label>
            <label>Description:<textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}/></label>
            <label htmlFor="member-name">Member:
              <select name="member-name" id="member-name" value={eventMember} onChange={(e) => setEventMember(e.target.value)}>
                {memberNodes}
              </select>
            </label>
            <label>Start:
              <input type="date" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)}/>
              <input type="time" value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)}/>
            </label>
            <label>End:
              <input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)}/>
              <input type="time" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)}/>
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={(e) => handleDeleteEvent(e, event.id, true)}>Delete</button>
          </form>
        </section>
      </Modal>
    </section>
    
  );
}

UpdateEvent.propTypes = {
  event: PropTypes.object
};
