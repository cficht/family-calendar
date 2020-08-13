import React, { useState } from 'react';
import { API } from 'aws-amplify';
import config from '../src/aws-exports';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import useUser from '../hooks/userHooks';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import styles from '../styles/auth.module.css';
import EnterButton from '../components/EnterButton';
import Link from 'next/link';

API.configure(config);

export default function Home() {
  const [logType, setLogType] = useState(0);
  const { user } = useUser();
  
  const renderLogType = () => {
    if(logType === 0) return <SignIn />;
    if(logType === 1) return <SignUp />;
  };

  const isLogged = () => {
    return <EnterButton />;
  };

  return (
    <div className="splash-container">
      <Head>
        <title>Family Calendar</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="page-container">
        <h1>Welcome to Family Calendar</h1>
        <div className={styles.auth_body}>
          {user ? null : <button type="button" onClick={() => setLogType(logType - 1)} disabled={logType === 0}>&larr;</button>}
          {user ? isLogged() : renderLogType()}
          {user ? null : <button type="button" onClick={() => setLogType(logType + 1)} disabled={logType === 1}>&rarr;</button>}
        </div>
        { !user ? <Link href="/calendar"><a><h4>Enter Without Signing In</h4></a></Link> : null }
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
