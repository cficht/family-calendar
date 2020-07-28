import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import useUser from '../hooks/userHooks';
import { customStyles } from '../utils/helpers';
import styles from '../styles/tools.module.css';

Modal.setAppElement('body');

export default function UpdateEvent({ event }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventObj, setEventObj] = useState({
    name: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    memberID: ''
  });

  const { members, handleUpdateEvent, handleDeleteEvent, handleNotification } = useUser();

  useEffect(() => {
    if(!event?.id) return;

    const startDate = moment(event?.start).format('YYYY-MM-DD');
    const startTime = moment(event?.start).format('HH:mm');
    const endDate = moment(event?.end).format('YYYY-MM-DD');
    const endTime = moment(event?.end).format('HH:mm');

    setEventObj({
      name: event.name,
      description: event.description,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      memberID: event.memberID,
    });
  }, [event]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const memberNodes = members?.map(member => <option value={member.id} key={member.id}>{member.name}</option>);

  return (
    <section>
      <button onClick={openModal}>Update Event</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Update Event Modal">
        <section className={styles.event_box}>
          <h3>Update Event:</h3>
          <form onSubmit={e => {
            try {
              handleUpdateEvent(e, event.id, event.memberID, eventObj);
              closeModal();
            } catch(error) {
              handleNotification(error);
            }
          }}>
            <label>Name:<input type="text" value={eventObj.name} onChange={(e) => setEventObj({ ...eventObj, name: e.target.value })}/></label>
            <label>Description:<textarea value={eventObj.description} onChange={(e) => setEventObj({ ...eventObj, description: e.target.value })}/></label>
            <label htmlFor="member-name">Member:
              <select name="member-name" id="memberID" value={eventObj.memberID} onChange={(e) => setEventObj({ ...eventObj, memberID: e.target.value })}>
                {memberNodes}
              </select>
            </label>
            <label>Start:
              <input type="date" value={eventObj.startDate} onChange={(e) => setEventObj({ ...eventObj, startDate: e.target.value })}/>
              <input type="time" value={eventObj.startTime} onChange={(e) => setEventObj({ ...eventObj, startTime: e.target.value })}/>
            </label>
            <label>End:
              <input type="date" value={eventObj.endDate} onChange={(e) => setEventObj({ ...eventObj, endDate: e.target.value })}/>
              <input type="time" value={eventObj.endTime} onChange={(e) => setEventObj({ ...eventObj, endTime: e.target.value })}/>
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
