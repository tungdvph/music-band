import React, { useState, useContext } from 'react'; // Xóa useEffect
import axios from 'axios';
import './BookingForm.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Giữ lại Link

function BookingForm() {
    const [formData, setFormData] = useState({
        eventType: '', date: '', time: '', location: '', venue: '',
        duration: '', audienceSize: '', requirements: '', budget: '',
        contactName: '', contactEmail: '', contactPhone: '', message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user, loading } = useContext(AuthContext); // Lấy cả loading
    // const navigate = useNavigate(); // Xóa dòng này

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('/api/bookings', formData, {
                withCredentials: true,
            });
            console.log(response.data);
            setSuccessMessage('Yêu cầu đặt lịch của bạn đã được gửi thành công!');
            setFormData({
                eventType: '', date: '', time: '', location: '', venue: '',
                duration: '', audienceSize: '', requirements: '', budget: '',
                contactName: '', contactEmail: '', contactPhone: '', message: ''
            });
        } catch (error) {
            console.error("Error submitting booking:", error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Bạn cần đăng nhập để thực hiện thao tác này.');
                // navigate('/login'); // Không chuyển hướng ở đây
            } else if (error.response && error.response.data && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.map(err => err.msg).join(', '));
            } else {
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };


    if (loading) {
        return <div>Đang tải...</div>; // Hiển thị loading
    }

    if (!user) {
        return (
            <div>
                <p>Vui lòng <Link to="/login">đăng nhập</Link> để sử dụng chức năng này.</p>
                {/* Hoặc dùng button:
        <button onClick={() => navigate('/login', { state: { from: '/booking' } })}>Đăng nhập</button>
        */}
            </div>
        );
    }


    return (
        <div className="booking-form-container">
            <h2>Đặt lịch biểu diễn</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="eventType">Loại sự kiện:</label>
                    <input type="text" id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Ngày:</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Giờ:</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Địa điểm:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Tên địa điểm (nếu có):</label>
                    <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Thời lượng (giờ):</label>
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="audienceSize">Số lượng khán giả dự kiến:</label>
                    <input type="number" id="audienceSize" name="audienceSize" value={formData.audienceSize} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="requirements">Yêu cầu (âm thanh, ánh sáng,...):</label>
                    <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Ngân sách (tùy chọn):</label>
                    <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactName">Tên người liên hệ:</label>
                    <input type="text" id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactEmail">Email:</label>
                    <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactPhone">Số điện thoại:</label>
                    <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor='message'>Tin nhắn:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
                </div>
                <button type="submit">Gửi yêu cầu</button>
            </form>
        </div>
    );
}

export default BookingForm;