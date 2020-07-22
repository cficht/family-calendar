import React, { useEffect, useState } from 'react';
import useUser from '../hooks/userHooks';
import Head from 'next/head';
import Link from 'next/link';
import SignOut from '../components/SignOut';

export default function admin() {
  const { family, checkLog, handleAddMember } = useUser();
  const [memberName, setMemberName] = useState('');
  const [memberColor, setMemberColor] = useState('#000000');

  useEffect(() => {
    checkLog();
  }, []);
  
  return (
    <div>
      <Head>
        <title>Family Calendar: Month View</title>
      </Head>
      <main className="page-container">
        <h1>The {family?.name} Family</h1>
        <Link href="/year"><a>Year</a></Link>
        <Link href="/month"><a>Month</a></Link>
        <div className="month-container">
          <section>
            <form onSubmit={(e) => handleAddMember(e, memberName, memberColor)}>
              <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Name"/>
              <input type="color" value={memberColor} onChange={(e) => setMemberColor(e.target.value)}/>
              <button type="submit">Add</button>
            </form>
          </section>
        </div>
      </main>
      <footer className="footer">
        <SignOut />
      </footer>
    </div>
  );
}
