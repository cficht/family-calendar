import React from 'react'
import moment from 'moment';

export default function DaySmall({ day }) {
  return (
    <div className="month-day" >
      <h3>{moment(day).format('D')}</h3>
    </div>
  )
}
