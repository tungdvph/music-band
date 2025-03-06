// client/src/components/Logout.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; // Import axios

function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.get('/api/logout', { withCredentials: true }); // Gửi cookies
                setUser(null);
                localStorage.removeItem('user');
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
                // Xử lý lỗi (có thể hiển thị thông báo)
            }
        };

        handleLogout();
    }, [setUser, navigate]);

    return (
        <div>
            <p>Đang đăng xuất...</p>
        </div>
    );
}

export default Logout;