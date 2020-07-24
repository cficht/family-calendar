import Head from 'next/head';
// import { API } from 'aws-amplify';
import { useState } from 'react';
import Splash from '../components/Splash';
// import config from '../src/aws-exports';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import useUser from '../hooks/userHooks';

// API.configure(config);


export default function Home() {
  const { user } = useUser();
  const [logType, setLogType] = useState(0);

  const renderLogType = () => {
    if(logType === 0) return <SignIn />;
    if(logType === 1) return <SignUp />;
  };

  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>
      <main className="main-body">
        {user ? null : <button type="button" onClick={() => setLogType(logType - 1)} disabled={logType === 0}>&larr;</button>}
        {user ? <Splash /> : renderLogType()}
        {user ? null : <button type="button" onClick={() => setLogType(logType + 1)} disabled={logType === 1}>&rarr;</button>}
      </main>
      <footer className="footer">
        {user ? <SignOut /> : null}
      </footer>
    </div>
  );
}
