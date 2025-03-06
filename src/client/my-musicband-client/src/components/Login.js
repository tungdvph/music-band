// client/src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Đăng nhập thành công:
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/'); // Chuyển hướng về trang chủ

            } else {
                setMessage(data.message || 'Đăng nhập thất bại.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Đã xảy ra lỗi khi kết nối đến server.');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            {message && <div className={message.includes('thành công') ? "success-message" : "error-message"}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
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
            <div className='link-register'>
                <p>Bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link></p>
            </div>
        </div>
    );
}

export default Login;