import React, { useEffect } from 'react';
import useUser from '../hooks/userHooks';
import Head from 'next/head';
import Link from 'next/link';
import SignOut from '../components/SignOut';
import AddMember from '../components/AddMember';
import UpdateMemberNode from '../components/UpdateMemberNode';

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
        <h1>The {family?.name} Family</h1>
        <Link href="/year"><a>Year</a></Link>
        <Link href="/month"><a>Month</a></Link>
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
