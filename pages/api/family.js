import { API, graphqlOperation } from 'aws-amplify';
import { getFamily, listFamilys } from '../../src/graphql/queries';
import { createMember } from '../../src/graphql/mutations';

export const getFamilyById = async(id) => {
  const family = await API.graphql(graphqlOperation(getFamily, { id }));
  return family.data.getFamily;
};

export const getFamilies = async() => {
  const families = await API.graphql(graphqlOperation(listFamilys));
  return families.data.listFamilys;
};

export const postMember = async(member) => {
  const newMember = await API.graphql(graphqlOperation(createMember, { input: member }));
  return newMember.data.createMember;
};

// const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
