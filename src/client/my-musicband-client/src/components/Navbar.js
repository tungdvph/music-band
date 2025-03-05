// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from './Logout.js'; // Import Logout component

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin user

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
                {/* Hiển thị Login/Register hoặc Logout */}
                {user ? (
                    <>
                        <li className="nav-item nav-user">
                            <span>Xin chào, {user.username}</span>
                        </li>
                        <li className="nav-item">
                            <Logout />
                        </li>

                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login">Đăng nhập</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register">Đăng ký</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;