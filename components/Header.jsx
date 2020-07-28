import React from 'react';
import PropTypes from 'prop-types';
import useCalendar from '../hooks/calendarHooks';
import Link from 'next/link';

export default function Header({ family, page }) {
  const { handleViewChange } = useCalendar();

  const headerDisplay = () => {
    if(page === 'Admin') return <Link href="/"><a>Return to Calendar</a></Link>;
    else return (
      <>
        <a onClick={() => handleViewChange('Year')}>Year</a>
        <a onClick={() => handleViewChange('Month')}>Month</a>
        <a onClick={() => handleViewChange('Day')}>Day</a>
      </>
    );
  };
  
  return (
    <section className="header">
      <h1>The {family?.name} Family</h1>
      {headerDisplay()}
    </section>
  );
}

Header.propTypes = {
  family: PropTypes.object,
  page: PropTypes.string
};
