import React from 'react';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import Confirmation from '../components/Confirmation';
import styles from '../styles/auth.module.css';

export default function confirmation() {
  return (
    <div>
      <Head>
        <title>Family Calendar: Confirmation</title>
      </Head>
      <main className={styles.auth_body}>
        <Confirmation />
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
