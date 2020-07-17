import React from 'react'
import moment from 'moment';
import Link from 'next/link';

export default function DaySmall({ day }) {
  const date = moment(day).format('MM-DD-YYYY')
  return (
    <div className="month-day" >
      <Link href="/day/[date]" as={`/day/${date}`}><h3>{moment(day).format('D')}</h3></Link>
    </div>
  )
}
