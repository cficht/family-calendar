import React from 'react';
import Head from 'next/head';
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
    </div>
  );
}
