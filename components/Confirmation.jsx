import React, { useState } from 'react';
import { confirmSignUp } from '../pages/api/auth';
import useUser from '../hooks/userHooks';
import styles from '../styles/auth.module.css';

export default function Confirmation() {
  const [userName, setUserName] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const { handleNotification } = useUser();

  return (
    <section className={styles.auth_box}>
      <h2>Confirm Your Account</h2>
      <form onSubmit={(e) => {
        confirmSignUp(e, userName, confirmation)
          .catch(e => handleNotification(e));
      }}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <input type="text" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder="Code" />
        <button type="submit">Confirm</button>
      </form>
    </section>
  );
}
