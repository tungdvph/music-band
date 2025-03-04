// client/src/components/ScheduleItem.js
import React from "react";
import './ScheduleItem.css'
const ScheduleItem = ({ date, time, venue, link }) => {
    return (
        <div className="schedule-item">
            <h3 className="schedule-date">{date}</h3>
            <p className="schedule-time">Time: {time}</p>
            <p className="schedule-venue">Venue: {venue}</p>
            <a className="schedule-link" href={link}>Đặt vé</a>
        </div>
    )
}

export default ScheduleItem;