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
                    <Link to="/music">Music</Link>
                </li>
                <li className="nav-item">
                    <Link to="/news">Tin Tức</Link>
                </li>
                <li className="nav-item">
                    <Link to="/schedule">Lịch Trình</Link>
                </li>
                <li className="nav-item">
                    <Link to="/booking">Đặt lịch</Link>
                </li>
                <li className="nav-item">
                    <Link to="/members">Thành Viên</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">Liên Hệ</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;