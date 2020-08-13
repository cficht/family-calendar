import React from 'react';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import Confirmation from '../components/Confirmation';
import styles from '../styles/auth.module.css';

export default function confirmation() {
  return (
    <div className="splash-container">
      <Head>
        <title>Family Calendar: Confirmation</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="page-container">
        <div className={styles.auth_body}>
          <Confirmation />
        </div>
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
