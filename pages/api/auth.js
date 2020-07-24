import Router from 'next/router';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createFamily } from '../../src/graphql/mutations';

export async function signUp(e, userName, email, family, password) {
  e.preventDefault();
  try {
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
    console.log('error signing up:', error);
  }
}


export async function confirmSignUp(e, userName, confirmation) {
  e.preventDefault();

  try {
    await Auth.confirmSignUp(userName, confirmation);
    Router.push('/');
  } catch(error) {
    console.log('error confirming sign up', error);
  }
}

export async function signIn(e, userName, password) {
  e.preventDefault();
  try {
    await Auth.signIn(userName, password);

    Router.push('/month');
  } catch(error) {
    console.log('error signing in', error);
  }
}

export async function signOut(e) {
  e.preventDefault();
  try {
    await Auth.signOut();
    Router.reload();
  } catch(error) {
    console.log('error signing out: ', error);
  }
}
