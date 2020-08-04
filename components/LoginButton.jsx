import React from 'react';
import Link from 'next/link';
import styles from '../styles/tools.module.css';

export default function LoginButton() {
  return (
    <section className={styles.left_button}>
      <Link href="/"><a><button type="button">Account</button></a></Link>
    </section>
  );
}
