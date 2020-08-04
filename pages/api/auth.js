import Router from 'next/router';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createFamily } from '../../src/graphql/mutations';

export async function signUp(e, userName, email, family, password) {
  e.preventDefault();
  try {
    if(email.length < 1) throw new Error('User must have an email address!');
    if(family.length < 1) throw new Error('User must provide a family name!');
    const user = await Auth.signUp({
      username: userName,
      password,
      attributes: {
        email,
        'custom:Family': family,
      },
    });

    API.graphql(
      graphqlOperation(createFamily, {
        input: {
          id: user.userSub,
          name: family,
        },
      }),
    );

    Router.push('/confirmation');
  } catch(error) {
    throw new Error(error.message);
  }
}

export async function confirmSignUp(e, userName, confirmation) {
  e.preventDefault();

  try {
    await Auth.confirmSignUp(userName, confirmation);
    Router.push('/');
  } catch(error) {
    throw new Error(error.message); 
  }
}

export async function signIn(e, userName, password) {
  e.preventDefault();
  try {
    await Auth.signIn(userName, password);
    Router.push('/calendar');
  } catch(error) {
    if(password.length < 1) throw new Error('Password cannot be empty');
    throw new Error(error.message); 
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
    Router.push('/');
  } catch(error) {
    throw new Error(error.message); 
  }
}
