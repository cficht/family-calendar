import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Header({ family }) {
  return (
    <section className="header">
      <h1>The {family?.name} Family</h1>
      <Link href="/year"><a>Year</a></Link>
      <Link href="/month"><a>Month</a></Link>
      <Link href="/day"><a>Day</a></Link>
    </section>
  );
}

Header.propTypes = {
  family: PropTypes.object
};
