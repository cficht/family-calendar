import Head from 'next/head';
import { Auth, API } from 'aws-amplify';
import { useEffect } from 'react';
import Splash from '../components/Splash';
import config from '../src/aws-exports';
import SignUp from '../components/SignUp';
import Confirmation from '../components/Confirmation';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';

API.configure(config);

export default function Home() {
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>

      <main className="main-body">
        <Splash />
        <SignUp />
        <Confirmation />
        <SignIn />
      </main>
      <footer className="footer">
        <SignOut />
      </footer>
    </div>
  );
}
