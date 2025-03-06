//client/src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin location

    const from = location.state?.from || '/'; // Lấy trang trước đó, hoặc về trang chủ

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/login', { username, password }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                const userData = response.data.user;

                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                navigate(from, { replace: true }); // Quay lại trang trước đó, hoặc trang chủ. replace: true để xóa trang /login khỏi history.
            } else {
                setError('Đăng nhập không thành công.');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.');
            }
        }
    };

    return (
        <div className='login-container'>
            <h2>Đăng nhập</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='form-group'>
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;