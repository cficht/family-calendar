import React from 'react';
import useUser from '../hooks/userHooks';
import styles from '../styles/tools.module.css';

export default function SignOut() {
  const { handleSignOut } = useUser();
  
  return (
    <section className={styles.left_button}>
      <button type="button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
    </section>
  );
}
