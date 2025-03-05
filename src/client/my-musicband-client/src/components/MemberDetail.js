import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MemberDetail.css'; // Import file CSS (tự tạo file này)

function MemberDetail() {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`/api/members/${slug}`);
                setMember(response.data);
            } catch (error) {
                console.error("Error fetching member:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [slug]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Có lỗi xảy ra: {error.response?.data?.message || error.message}</div>; // Check cả error.response.data
    }

    if (!member) {
        return <div>Không tìm thấy thành viên.</div>;
    }

    return (
        <div className="member-detail">
            {/* SỬA ĐƯỜNG DẪN ẢNH */}
            <img src={`/${member.image}`} alt={member.name} className="member-detail-image" />
            <h1 className="member-detail-name">{member.name}</h1>
            <p className="member-detail-role">Vai trò: {member.role}</p>
            <p className="member-detail-bio">{member.bio}</p>
            {/* Hiển thị thông tin ban nhạc nếu có */}
            {member.band && (
                <p className="member-detail-band">Ban nhạc: {member.band.name}</p>
            )}
        </div>
    );
}

export default MemberDetail;