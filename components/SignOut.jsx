import React from 'react';
import { signOut } from '../pages/api/auth';

export default function SignOut() {
  return (
    <section className="auth-box">
      <button type="button" onClick={(e) => signOut(e)}>Sign Out</button>
    </section>
  );
}
