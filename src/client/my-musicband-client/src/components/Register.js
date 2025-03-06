// client/src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios'; // Import axios

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState(''); // Để hiển thị thông báo lỗi/thành công
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('/api/register', { username, password, email, fullName }, {
                withCredentials: true,
            });

            const data = response.data;

            if (response.status === 200 || response.status === 201) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setMessage(data.message || 'Đã xảy ra lỗi.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                setMessage(error.response.data.message || 'Đã xảy ra lỗi.');
            } else {
                setMessage('Đã xảy ra lỗi khi kết nối đến server.');
            }

        }
    };



    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
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
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
}

export default Register;