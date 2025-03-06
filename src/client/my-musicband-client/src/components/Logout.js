// client/src/components/Logout.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch('/api/logout'); // Gọi API logout
                if (response.ok) {
                    setUser(null); // Xóa user khỏi context
                    localStorage.removeItem('user'); // Xóa user khỏi localStorage
                    navigate('/login'); // Chuyển hướng về trang đăng nhập
                } else {
                    console.error('Logout failed:', await response.text());
                    // Xử lý lỗi logout (ví dụ: hiển thị thông báo)
                }
            } catch (error) {
                console.error('Error during logout:', error);
                // Xử lý lỗi kết nối
            }
        };

        handleLogout(); // Gọi hàm logout ngay khi component được render
    }, [setUser, navigate]); // Dependency array: setUser và navigate

    return (
        <div>
            <p>Đang đăng xuất...</p> {/* Hiển thị thông báo trong khi chờ logout */}
        </div>
    );
}
export default Logout;