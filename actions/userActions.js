import { postMember, patchMember, removeMember, postEvent, removeEvent, patchEvent, patchFamily } from '../pages/api/family';

export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const SET_FAMILY = 'SET_FAMILY';
export const setFamily = (family) => ({
  type: SET_FAMILY,
  payload: family,
});

export const CHANGE_FAMILY = 'CHANGE_FAMILY';
export const changeFamily = (family) => dispatch => {
  return patchFamily(family)
    .then(({ id, name }) => {
      dispatch({
        type: CHANGE_FAMILY,
        payload: { id, name },
      });
    });
};

export const ADD_MEMBER = 'ADD_MEMBER';
export const addMember = (member) => dispatch => {
  return postMember(member)
    .then(({ id, name, color, icon, familyID, createdAt, updatedAt }) => {
      dispatch({
        type: ADD_MEMBER,
        payload: { id, name, color, icon, familyID, createdAt, updatedAt, events: { items: [], nextToken: null } },
      });
    });
};

export const CHANGE_MEMBER = 'CHANGE_MEMBER';
export const changeMember = (member) => dispatch => {
  return patchMember(member)
    .then(({ id, name, color, icon, familyID, createdAt, updatedAt }) => {
      dispatch({
        type: CHANGE_MEMBER,
        payload: { id, name, color, icon, familyID, createdAt, updatedAt },
      });
    });
};

export const SUBTRACT_MEMBER = 'SUBTRACT_MEMBER';
export const subtractMember = (memberId) => dispatch => {
  return removeMember(memberId)
    .then(({ id, name, color, icon, familyID, createdAt, updatedAt }) => {
      dispatch({
        type: SUBTRACT_MEMBER,
        payload: { id, name, color, icon, familyID, createdAt, updatedAt },
      });
    });
};

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (event) => dispatch => {
  return postEvent(event)
    .then(({ id, name, description, start, end, memberID, createdAt, updatedAt }) => {
      dispatch({
        type: ADD_EVENT,
        payload: { id, name, description, start, end, memberID, createdAt, updatedAt },
      });
    });
};

export const CHANGE_EVENT = 'CHANGE_EVENT';
export const changeEvent = (event, oldMember) => dispatch => {
  return patchEvent(event)
    .then(({ id, name, description, start, end, memberID, createdAt, updatedAt }) => {
      dispatch({
        type: CHANGE_EVENT,
        payload: { id, name, description, start, end, memberID, createdAt, updatedAt, oldMember },
      });
    });
};

export const SUBTRACT_EVENT = 'SUBTRACT_EVENT';
export const subtractEvent = (eventId) => dispatch => {
  return removeEvent(eventId)
    .then(({ id, name, description, start, end, memberID, createdAt, updatedAt }) => {
      dispatch({
        type: SUBTRACT_EVENT,
        payload: { id, name, description, start, end, memberID, createdAt, updatedAt },
      });
    });
};
