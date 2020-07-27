import React, { useState } from 'react';
import { signUp } from '../pages/api/auth';
import useUser from '../hooks/userHooks';

export default function SignUp() {
  const { handleNotification } = useUser();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [family, setFamily] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="auth-box">
      <h3>Create an Account</h3>
      <form onSubmit={(e) => {signUp(e, userName, email, family, password)
        .catch(e => handleNotification(e));
      }}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} placeholder="Family Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}
