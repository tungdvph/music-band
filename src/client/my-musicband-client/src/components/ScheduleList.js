// client/src/components/ScheduleList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleItem from "./ScheduleItem";
import './ScheduleList.css'
const ScheduleList = () => {

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('/api/schedules')
            .then(res => {
                setSchedules(res.data);
            })
            .catch(err => {
                console.log("Error:", err);
            })
    }, []);

    return (
        <section className="schedule-list">
            <h2>Lịch diễn</h2>
            <div className="schedule-container">
                {schedules.map(schedule => (
                    <ScheduleItem
                        key={schedule.id}
                        date={schedule.date}
                        time={schedule.time}
                        venue={schedule.venue}
                        link={schedule.link}
                    />
                ))}
            </div>
        </section>
    )
}
export default ScheduleList;