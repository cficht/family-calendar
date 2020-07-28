import React, { useState } from 'react';
import { API } from 'aws-amplify';
import config from '../src/aws-exports';
import Router from 'next/router';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import useUser from '../hooks/userHooks';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import styles from '../styles/auth.module.css';

API.configure(config);

export default function Home() {
  const [logType, setLogType] = useState(0);
  const { user } = useUser();
  
  const renderLogType = () => {
    if(logType === 0) return <SignIn />;
    if(logType === 1) return <SignUp />;
  };

  const redirectLogged = () => {
    Router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Family Calendar</title>
      </Head>
      <main className={styles.auth_body}>
        {user ? null : <button type="button" onClick={() => setLogType(logType - 1)} disabled={logType === 0}>&larr;</button>}
        {user ? redirectLogged() : renderLogType()}
        {user ? null : <button type="button" onClick={() => setLogType(logType + 1)} disabled={logType === 1}>&rarr;</button>}
      </main>
      <ToastContainer 
        position="bottom-center"
        transition={Slide}
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ textAlign: 'center' }}
      />
    </div>
  );
}
