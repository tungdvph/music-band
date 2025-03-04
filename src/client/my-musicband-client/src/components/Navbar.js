// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import file CSS

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/music">Music</Link> {/* Giả định: MusicPlayer là trang nghe nhạc */}
                </li>
                <li className="nav-item">
                    <Link to="/news">News</Link>  {/* Giả định: NewsList là trang tin tức */}
                </li>
                <li className="nav-item">
                    <Link to="/schedule">Schedule</Link> {/* Giả định: ScheduleList là trang lịch trình */}
                </li>
                {/* Hero không có khả năng là một trang riêng. Nó thường là 1 component trong trang home */}
                {/* NewsItem là component con của NewsList, không phải một trang riêng */}
                {/* ScheduleItem là component con của ScheduleList, không phải một trang riêng */}
            </ul>
        </nav>
    );
}

export default Navbar;