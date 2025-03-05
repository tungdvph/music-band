// client/src/components/Logout.js

import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Logout.css'
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET' // Hoặc POST, tùy bạn thiết kế backend
            });

            if (response.ok) {
                // Xóa user khỏi localStorage
                localStorage.removeItem('user');
                navigate('/'); // Chuyển về trang chủ
                window.location.reload(); // Reload lại trang
            }
            else {
                console.error("Logout failed")
            }

        }
        catch (err) {
            console.error("Error", err)
        }
    }
    return (
        <button onClick={handleLogout} className='logout-button'>
            Đăng xuất
        </button>
    )
}

export default Logout