import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setTargetDate } from '../actions/calendarActions';
import { useCalendar } from '../hooks/calendarHooks';

export default function Nav() {
  const { targetDate } = useCalendar();

  return (
    <div>
      <Link href="/month"><a>Enter</a></Link>
    </div>
  )
}
