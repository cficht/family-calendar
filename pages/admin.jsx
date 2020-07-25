import React, { useEffect } from 'react';
import useUser from '../hooks/userHooks';
import Head from 'next/head';
import SignOut from '../components/SignOut';
import AddMember from '../components/AddMember';
import UpdateMember from '../components/UpdateMember';
import Header from '../components/Header';
import UpdateFamily from '../components/UpdateFamily';

export default function admin() {
  const { family, members, checkLog } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

  const memberNodes = members?.map(member => (
    <UpdateMember key={member.id} member={member}/>
  ));
  
  return (
    <div>
      <Head>
        <title>Family Calendar: Admin View</title>
      </Head>
      <main className="page-container">
        <div className="page-header">
          <Header family={family}/>
        </div>
        <div className="admin-container">
          <UpdateFamily family={family}/>
          <AddMember />
          <section className="member-container">
            <h2>Update Members:</h2> 
            <ul className="member-list">
              {memberNodes}
            </ul>
          </section>
        </div>
        <footer className="footer">
          <SignOut />
        </footer>
      </main>
    </div>
  );
}
