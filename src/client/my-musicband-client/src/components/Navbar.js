// client/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, setUser } = useContext(AuthContext); // Lấy user và setUser từ context
    const navigate = useNavigate(); // Sử dụng useNavigate

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET', // Rõ ràng là GET (hoặc POST, tùy backend)
            });
            if (response.ok) {
                setUser(null);  // Cập nhật context!
                localStorage.removeItem('user');
                navigate('/login'); // CHUYỂN HƯỚNG đến /login
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item"><Link to="/about">About</Link></li>
                <li className="nav-item"><Link to="/music">Music</Link></li>
                <li className="nav-item"><Link to="/news">Tin Tức</Link></li>
                <li className="nav-item"><Link to="/schedule">Lịch Trình</Link></li>
                <li className="nav-item"><Link to="/booking">Đặt lịch</Link></li>
                <li className="nav-item"><Link to="/members">Thành Viên</Link></li>
                <li className="nav-item"><Link to="/contact">Liên Hệ</Link></li>

                {user ? (  // Kiểm tra user từ CONTEXT
                    <>
                        <li className="nav-item nav-user">
                            <span>Xin chào, {user.username}</span> {/* Lấy username từ user */}
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item"><Link to="/login">Đăng nhập</Link></li>
                        <li className="nav-item"><Link to="/register">Đăng ký</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;