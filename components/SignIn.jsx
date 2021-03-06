import React, { useState } from 'react';
import { signIn } from '../pages/api/auth';
import useUser from '../hooks/userHooks';
import styles from '../styles/auth.module.css';

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { handleNotification } = useUser();

  return (
    <section className={styles.auth_box}>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        signIn(e, userName, password)
          .catch(e => handleNotification(e));
      }}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}
