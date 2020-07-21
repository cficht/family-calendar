import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <section className="splash-body">
      <h3>Welcome back!</h3>
      <Link href="/month"><a href="/#">Enter</a></Link>
    </section>
  );
}
