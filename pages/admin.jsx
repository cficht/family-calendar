import React, { useEffect, useState } from 'react';
import useUser from '../hooks/userHooks';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';
import SignOut from '../components/SignOut';
import AddMember from '../components/AddMember';
import UpdateMember from '../components/UpdateMember';
import Header from '../components/Header';
import UpdateFamily from '../components/UpdateFamily';
import styles from '../styles/admin.module.css';

export default function admin() {
  const { user, family, members, checkLog } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLog();
  }, []);

  useEffect(() => {
    if(user) setLoading(false);
  }, [user]);

  const memberNodes = members?.map(member => (
    <UpdateMember key={member.id} member={member}/>
  ));
  
  return (
    <div>
      {loading ? null : 
        <>
          <Head>
            <title>Family Calendar: Admin View</title>
          </Head>
          <main className="page-container">
            <div className="page-header">
              <Header family={family} page={'Admin'}/>
            </div>
            <div className="admin-body">
              <div className="page-right">
                <div className="calendar-container">
                  <UpdateFamily family={family}/>
                  <AddMember />
                  <section className={styles.member_container}>
                    <h2>Update Members:</h2> 
                    <ul className={styles.member_list}>
                      {memberNodes}
                    </ul>
                  </section>
                </div>    
                <SignOut />
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
