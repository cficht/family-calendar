import { useState } from 'react';
import { API } from 'aws-amplify';
import config from '../src/aws-exports';
import Router from 'next/router';
import Head from 'next/head';
import useUser from '../hooks/userHooks';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

API.configure(config);

export default function Home() {
  const { user } = useUser();
  const [logType, setLogType] = useState(0);

  const renderLogType = () => {
    if(logType === 0) return <SignIn />;
    if(logType === 1) return <SignUp />;
  };

  const redirectLogged = () => {
    Router.push('/');
  };

  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>
      <main className="main-body">
        {user ? null : <button type="button" onClick={() => setLogType(logType - 1)} disabled={logType === 0}>&larr;</button>}
        {user ? redirectLogged() : renderLogType()}
        {user ? null : <button type="button" onClick={() => setLogType(logType + 1)} disabled={logType === 1}>&rarr;</button>}
      </main>
    </div>
  );
}
