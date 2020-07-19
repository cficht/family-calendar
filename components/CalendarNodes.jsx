import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import { useCalendar } from '../hooks/calendarHooks';

export default function CalendarNodes({ className, node, type, display }) {
  const { handleTargetChange } = useCalendar();

  return (
    <div className={className} >
      <Link href={type} as={type}>
        <a onClick={() => handleTargetChange(moment(node).format())}><h3>{moment(node).format(display)}</h3></a>
      </Link>
    </div>
  )
}
