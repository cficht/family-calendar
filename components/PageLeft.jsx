import React from 'react';
import Link from 'next/link';
import SignOut from './SignOut';
import useUser from '../hooks/userHooks';

export default function PageLeft() {
  const { members } = useUser();

  const memberNodes = members?.map(member => {
    return (<li key={member.id} style={{ backgroundColor: member.color }}><h5>{member.name}</h5></li>);
  });

  return (
    <section className="left-container">
      <ul>
        <li><Link href="/admin"><a>Admin</a></Link></li>
        <li>
          <section className="member-display">
            <h3>Members:</h3>
            <ul>
              {memberNodes}
            </ul>
          </section>
        </li>
        <li><SignOut /></li>
      </ul>
    </section>
  );
}
