import React, { useEffect } from 'react';
import useUser from '../hooks/userHooks';
import Head from 'next/head';
import Link from 'next/link';
import SignOut from '../components/SignOut';
import AddMember from '../components/AddMember';
import UpdateMemberNode from '../components/UpdateMemberNode';
import Header from '../components/Header';

export default function admin() {
  const { family, members, checkLog } = useUser();

  useEffect(() => {
    checkLog();
  }, []);

  const memberNodes = members?.map(member => (
    <UpdateMemberNode key={member.id} member={member}/>
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
          <AddMember />
          <section className="member-container">
            <h2>Update Members:</h2> 
            <ul className="member-list">
              {memberNodes}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer">
        <SignOut />
      </footer>
    </div>
  );
}
