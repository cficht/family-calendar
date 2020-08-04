import React from 'react';
import PropTypes from 'prop-types';
import useCalendar from '../hooks/calendarHooks';
import Link from 'next/link';
import useUser from '../hooks/userHooks';

export default function Header({ family, page }) {
  const { handleViewChange } = useCalendar();
  const { user } = useUser();

  const headerDisplay = () => {
    if(page === 'Admin') return <Link href="/calendar"><button>Return to Calendar</button></Link>;
    else return (
      <>
        <button onClick={() => handleViewChange('Year')} disabled={page === 'Year'}>Year</button>
        <button onClick={() => handleViewChange('Month')} disabled={page === 'Month'}>Month</button>
        <button onClick={() => handleViewChange('Day')} disabled={page === 'Day'}>Day</button>
      </>
    );
  };
  
  return (
    <section className="header">
      { user ? <h1>The {family?.name} Family</h1> : <h1>Family Calendar</h1> }
      {headerDisplay()}
    </section>
  );
}

Header.propTypes = {
  family: PropTypes.object,
  page: PropTypes.string
};
