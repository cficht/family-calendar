import { Auth } from "aws-amplify";

export async function signUp(e, userName, password, email) {
  e.preventDefault();
  try {
      const user = await Auth.signUp({
          username: userName,
          password: password,
          attributes: {
              email: email
          }
      });
      console.log({ user });
  } catch (error) {
      console.log('error signing up:', error);
  }
}

export async function confirmSignUp(e, userName, confirmation) {
e.preventDefault();

  try {
    await Auth.confirmSignUp(userName, confirmation);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

export async function signIn(e, userName, password) {
e.preventDefault()
try {
    const user = await Auth.signIn(userName, password);
} catch (error) {
    console.log('error signing in', error);
}
}

export async function signOut(e) {
e.preventDefault()
try {
    await Auth.signOut();
} catch (error) {
    console.log('error signing out: ', error);
}
}