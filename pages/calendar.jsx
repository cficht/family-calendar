import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';
import Year from '../components/Year';
import Month from '../components/Month';
import Day from '../components/Day';

export default function calendar() {
  const { user, family } = useUser();
  const { view } = useCalendar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const displayView = () => {
    if(view === 'Year') return <Year />;
    if(view === 'Month') return <Month />;
    if(view === 'Day') return <Day />;
  };

  return (
    <div>
      {loading ? null : 
        <>
          <Head>
            <title>Family Calendar: {view} View</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <main className="page-container"> 
            <div className="page-header">
              <Header family={family} page={view}/>
            </div>
            <div className="page-body">
              <div className="page-left">
                <PageLeft />
              </div>
              <div className="page-right">
                <div className="calendar-container">
                  {displayView()}
                </div>
              </div>
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
        </>
      }
    </div>
  );
}
