import React from 'react';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import Confirmation from '../components/Confirmation';

export default function confirmation() {
  return (
    <div className="container">
      <Head>
        <title>Family Calendar: Confirmation</title>
      </Head>
      <main className="main-body">
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
