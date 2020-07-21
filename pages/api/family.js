import { API, graphqlOperation } from 'aws-amplify';
import { getFamily, listFamilys } from '../../src/graphql/queries';

export const getFamilyById = async(id) => {
  const family = await API.graphql(graphqlOperation(getFamily, { id }));
  return family.data.getFamily;
};

export const getFamilies = async() => {
  const families = await API.graphql(graphqlOperation(listFamilys));
  return families.data.listFamilys;
};
