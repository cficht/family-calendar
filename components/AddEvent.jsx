import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import useUser from '../hooks/userHooks';
import useCalendar from '../hooks/calendarHooks';
import { customStyles } from '../utils/helpers';
import styles from '../styles/tools.module.css';
 
Modal.setAppElement('body');

export default function AddEvent() {
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
  const { members, handleAddEvent, handleNotification } = useUser();
  const { targetDate } = useCalendar();

  useEffect(() => {
    if(members) setEventObj({ ...eventObj, memberID: members[0].id });
  }, [members]);

  useEffect(() => {
    resetInfo();
  }, [targetDate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const resetInfo = () => {
    setEventObj({
      name: '',
      description: '',
      startDate: moment(targetDate).format('YYYY-MM-DD'),
      startTime: '12:00',
      endDate: moment(targetDate).format('YYYY-MM-DD'),
      endTime: '13:00',
      memberID: members[0].id,
    });
  };

  const memberNodes = members?.map(member => <option value={member.id} key={member.id}>{member.name}</option>);

  return (
    <section className={styles.left_button}>
      <button onClick={openModal}>Add Event</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Event Modal">
        <section className={styles.event_box}>
          <h3>Add Event:</h3>
          <form onSubmit={e => {
            try {
              handleAddEvent(e, eventObj);
              resetInfo();
              closeModal();
            } catch(error) {
              handleNotification(error);
            }
          }}>
            <label>Name:<input type="text" value={eventObj.name} onChange={(e) => setEventObj({ ...eventObj, name: e.target.value })}/></label>
            <label>Description:<textarea value={eventObj.description} onChange={(e) => setEventObj({ ...eventObj, description: e.target.value })}/></label>
            <label htmlFor="member-name">Member:
              <select id="member-name" name="memberID" value={eventObj.memberID} onChange={(e) => setEventObj({ ...eventObj, memberID: e.target.value })}>
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
            <button type="submit">Add Event</button>
          </form>
        </section>
      </Modal>
    </section>
  );
}
