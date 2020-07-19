import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import { useCalendar } from '../hooks/calendarHooks';

export default function DaySmall({ day }) {
  const date = moment(day).format('MM-DD-YYYY')
  const { handleTargetChange } = useCalendar();

  return (
    <div className="month-day" >
      <Link href="/day" as={`/day`}>
        <a onClick={() => handleTargetChange(moment(day).format())}><h3>{moment(day).format('D')}</h3></a>
      </Link>
    </div>
  )
}
