import { postMember, patchMember, removeMember } from '../pages/api/family';

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

export const ADD_MEMBER = 'ADD_MEMBER';
export const addMember = (member) => dispatch => {
  return postMember(member)
    .then(({ id, name, color, icon, familyID, createdAt, updatedAt }) => {
      dispatch({
        type: ADD_MEMBER,
        payload: { id, name, color, icon, familyID, createdAt, updatedAt },
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
