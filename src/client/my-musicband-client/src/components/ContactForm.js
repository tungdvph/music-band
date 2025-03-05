// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css'; // Import file CSS (tạo ở bước sau)

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null); // Reset lỗi
        setSubmitSuccess(false);

        try {
            const response = await fetch('/api/contacts', { // Đổi URL nếu API của bạn khác
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setFormData({  // Reset form
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });
            } else {
                // Xử lý lỗi từ server (ví dụ: lỗi validation)
                const errorData = await response.json();
                setSubmitError(errorData.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            setSubmitError('Lỗi kết nối đến server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form-container">
            <h2>Liên Hệ</h2>
            {submitSuccess && <div className="success-message">Gửi liên hệ thành công!</div>}
            {submitError && <div className="error-message">{submitError}</div>}

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Tiêu đề:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Nội dung:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Liên Hệ'}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;