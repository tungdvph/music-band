// client/src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css'; // Import file CSS (tạo file này ở bước sau)

function BookingForm() {
    const [formData, setFormData] = useState({
        eventType: '',
        date: '',
        time: '',
        location: '',
        venue: '',
        duration: '',
        audienceSize: '',
        requirements: '',
        budget: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('/api/bookings', formData);
            console.log(response.data); // Log kết quả (nếu cần)
            setSuccessMessage('Yêu cầu đặt lịch của bạn đã được gửi thành công!');
            setFormData({ // Reset form sau khi gửi thành công
                eventType: '', date: '', time: '', location: '', venue: '',
                duration: '', audienceSize: '', requirements: '', budget: '',
                contactName: '', contactEmail: '', contactPhone: '', message: ''
            });
        } catch (error) {
            console.error("Error submitting booking:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                // Nếu server trả về lỗi validation
                setErrorMessage(error.response.data.errors.map(err => err.msg).join(', '));
            } else {
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

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