import React from 'react';
import Link from 'next/link';
import styles from '../styles/tools.module.css';

export default function AdminButton() {
  return (
    <section className={styles.left_button}>
      <Link href="/admin"><a><button type="button">Admin</button></a></Link>
    </section>
  );
}
