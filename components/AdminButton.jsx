import React from 'react';
import Link from 'next/link';

export default function AdminButton() {
  return (
    <section className="sign-out">
      <Link href="/admin"><a><button type="button">Admin</button></a></Link>
    </section>
  );
}
