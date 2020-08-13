import { API, graphqlOperation } from 'aws-amplify';
import { getFamily, listFamilys } from '../../src/graphql/queries';
import { createMember, updateMember, deleteMember, createEvent, deleteEvent, updateEvent, updateFamily } from '../../src/graphql/mutations';

export const getFamilyById = async(id) => {
  const family = await API.graphql(graphqlOperation(getFamily, { id }));
  return family.data.getFamily;
};

export const getFamilies = async() => {
  const families = await API.graphql(graphqlOperation(listFamilys));
  return families.data.listFamilys;
};

export const patchFamily = async(family) => {
  const updatedFamily = await API.graphql(graphqlOperation(updateFamily, { input: family }));
  return updatedFamily.data.updateFamily
};

export const postMember = async(member) => {
  const newMember = await API.graphql(graphqlOperation(createMember, { input: member }));
  return newMember.data.createMember;
};

export const patchMember = async(member) => {
  const updatedMember = await API.graphql(graphqlOperation(updateMember, { input: member }));
  return updatedMember.data.updateMember;
};

export const removeMember = async(memberId) => {
  const deletedMember = await API.graphql(graphqlOperation(deleteMember, { input: { id: memberId } }));
  return deletedMember.data.deleteMember;
};

export const postEvent = async(event) => {
  const newEvent = await API.graphql(graphqlOperation(createEvent, { input: event }));
  return newEvent.data.createEvent;
};

export const patchEvent = async(event) => {
  const updatedEvent = await API.graphql(graphqlOperation(updateEvent, { input: event }));
  return updatedEvent.data.updateEvent;
};

export const removeEvent = async(eventId) => {
  const newEvent = await API.graphql(graphqlOperation(deleteEvent, { input: { id: eventId } }));
  return newEvent.data.deleteEvent;
};
