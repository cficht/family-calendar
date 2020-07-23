import React from 'react';
import Link from 'next/link';
import SignOut from './SignOut';

export default function PageLeft() {
  return (
    <section className="left-container">
      <ul>
        <li><Link href="/admin"><a>Admin</a></Link></li>
        <li><SignOut /></li>
      </ul>
    </section>
  );
}
