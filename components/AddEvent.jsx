import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import useUser from '../hooks/userHooks';
import useCalendar from '../hooks/calendarHooks';
import { customStyles } from '../utils/helpers';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
 
Modal.setAppElement('body');

export default function AddEvent() {
  const { members, handleAddEvent } = useUser();
  const { targetDate } = useCalendar();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventMember, setEventMember] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  useEffect(() => {
    if(members) setEventMember(members[0].id);
  }, [members]);

  useEffect(() => {
    resetInfo();
  }, [targetDate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const resetInfo = () => {
    setEventName('');
    setEventDescription('');
    setEventMember(members[0].id);
    setEventStartDate(moment(targetDate).format('YYYY-MM-DD'));
    setEventEndDate(moment(targetDate).format('YYYY-MM-DD'));
    setEventStartTime('12:00');
    setEventEndTime('13:00');
  };

  const memberNodes = members?.map(member => <option value={member.id} key={member.id}>{member.name}</option>);

  return (
    
    <section className="sign-out">
      <button onClick={openModal}>Add Event</button>
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <section className="add-event-box">
          <h3>Add Event:</h3>
          <form onSubmit={e => {
            handleAddEvent(e, eventName, eventDescription, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventMember);
            resetInfo();
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
            <button type="submit">Add Event</button>
          </form>
        </section>
      </Modal>
    </section>

  );
}
