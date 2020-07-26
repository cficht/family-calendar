import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import useCalendar from '../hooks/calendarHooks';
import useUser from '../hooks/userHooks';
import Header from '../components/Header';
import PageLeft from '../components/PageLeft';
import Year from '../components/Year';
import Month from '../components/Month';
import Day from '../components/Day';

export default function calendar() {
  const { user, family, checkLog } = useUser();
  const { view } = useCalendar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLog();
  }, []);

  useEffect(() => {
    if(user) setLoading(false);
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
          </Head>
          <main className="page-container"> 
            <div className="page-header">
              <Header family={family} />
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
        </>
      }
    </div>
  );
}
