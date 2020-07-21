import React, { useState } from 'react';
import { signIn } from '../pages/api/auth';

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="auth-box">
      <h3>Sign in to Family Calendar</h3>
      <form onSubmit={(e) => signIn(e, userName, password)}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}
