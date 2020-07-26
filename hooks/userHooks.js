import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { setUser, setFamily, addMember, changeMember, subtractMember, addEvent, subtractEvent, changeEvent, changeFamily } from '../actions/userActions';
import { selectUser, selectFamily, selectMembers, selectEvents } from '../selectors/userSelectors';
import { getFamilyById, patchFamily } from '../pages/api/family';
import { signOut } from '../pages/api/auth';

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const family = useSelector(selectFamily);
  const members = useSelector(selectMembers);
  const events = useSelector(selectEvents);

  useEffect(() => {
    if(!user) {
      Auth.currentAuthenticatedUser()
        .then(({ username, attributes }) => dispatch(setUser({ id: attributes.sub, username, email: attributes.email })))
        .then(({ payload }) => getFamilyById(payload.id))
        .then((res) => dispatch(setFamily(res)))
        .catch((err) => console.log(err));
    }
  }, []);

  const checkLog = () => {
    Auth.currentAuthenticatedUser()
      .then((() => console.log('Logged in')))
      .catch(() => Router.push('/login'));
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(setUser(''))
    signOut();
  }

  const handleUpdateFamily = (e, familyId, familyName) => {
    e.preventDefault();
    console.log(familyName);
    const family = {
      id: familyId,
      name: familyName
    };
    dispatch(changeFamily(family));
  };

  const handleAddMember = (e, memberName, memberColor, setMemberName, setMemberColor) => {
    e.preventDefault();
    const memberId = nanoid();
    const member = {
      id: memberId,
      name: memberName,
      color: memberColor,
      familyID: family.id
    };
    dispatch(addMember(member));
    setMemberName('');
    setMemberColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  const handleUpdateMember = (e, memberId, memberName, memberColor) => {
    e.preventDefault();
    const member = {
      id: memberId,
      name: memberName,
      color: memberColor
    };
    dispatch(changeMember(member));
  };

  const handleDeleteMember = (e, memberId) => {
    e.preventDefault();
    dispatch(subtractMember(memberId));
  };

  const handleAddEvent = (e, eventName, eventDescription, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventMember) => {
    e.preventDefault();
    const eventId = nanoid();
    const event = {
      id: eventId,
      name: eventName,
      description: eventDescription,
      start: (moment(`${eventStartDate}  ${eventStartTime}`, 'YYYY-MM-DD HH:mm').format()),
      end: (moment(`${eventEndDate}  ${eventEndTime}`, 'YYYY-MM-DD HH:mm').format()),
      memberID: eventMember
    };
    dispatch(addEvent(event));
  };

  const handleUpdateEvent = (e, eventId, eventName, eventDescription, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventMember, oldMember) => {
    e.preventDefault();
    const event = {
      id: eventId,
      name: eventName,
      description: eventDescription,
      start: (moment(`${eventStartDate}  ${eventStartTime}`, 'YYYY-MM-DD HH:mm').format()),
      end: (moment(`${eventEndDate}  ${eventEndTime}`, 'YYYY-MM-DD HH:mm').format()),
      memberID: eventMember
    };
    dispatch(changeEvent(event, oldMember));
  };

  const handleDeleteEvent = (e, eventId) => {
    e.preventDefault();
    dispatch(subtractEvent(eventId));
  };

  return {
    user,
    family,
    members,
    events,
    checkLog,
    handleSignOut,
    handleUpdateFamily,
    handleAddMember,
    handleUpdateMember,
    handleDeleteMember,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent
  };
};

export default useUser;
