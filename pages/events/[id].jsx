import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import PageLeft from '../../components/PageLeft';
import CalendarHead from '../../components/CalendarHead';
import useUser from '../../hooks/userHooks';
import UpdateEvent from '../../components/UpdateEvent';

export default function event() {
  const [event, setEvent] = useState({});
  const { family, events } = useUser();

  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    setEvent(events?.find(event => event.id = id));
  }, [events]);
  

  return (
    <div>
      <Head>
        <title>Family Calendar: Day View</title>
      </Head>
      <main className="page-container">
        <div className="page-header">
          <Header family={family}/>
        </div>
        <div className="page-body">
          <div className="page-left">
            <PageLeft />
          </div>
          <div className="page-right">
            <div className="calendar-container">
              <CalendarHead type="none" title={event?.name} />
              <div className="day-body">
                <UpdateEvent event={event}/>
              </div>
            </div>
          </div>
        </div> 
      </main>
    </div>
  );
}
