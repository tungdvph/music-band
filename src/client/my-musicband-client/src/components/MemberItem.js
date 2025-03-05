// client/src/components/MemberItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MemberItem.css';

function MemberItem({ name, role, image, bio, slug }) { // Nhận slug thay vì link
    return (
        <div className="member-item">
            {/* SAI ĐƯỜNG DẪN ẢNH Ở ĐÂY */}
            <img src={image} alt={name} className="member-image" />
            <h3 className="member-name">{name}</h3>
            <p className="member-role">{role}</p>
            <p className="member-bio">{bio}</p>
            <Link to={`/members/${slug}`} className="member-link">Xem chi tiết</Link> {/* Dùng slug */}
        </div>
    );
}

export default MemberItem;