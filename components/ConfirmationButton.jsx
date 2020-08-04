import React from 'react';
import Link from 'next/link';
import styles from '../styles/tools.module.css';

export default function ConfirmationButton() {
  return (
    <section className={styles.left_button}>
      <Link href="/confirmation"><a><button type="button">Confirmation</button></a></Link>
    </section>
  );
}
