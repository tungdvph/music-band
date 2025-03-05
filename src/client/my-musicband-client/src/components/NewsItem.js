//client/src/components/NewsItem.js 
import React from 'react';
import './NewsItem.css';
import { Link } from 'react-router-dom'; // Import Link

function NewsItem({ title, image, description, link }) {
    return (
        <div className="news-item">
            <img src={image} alt={title} className="news-image" />
            <h3 className="news-title">{title}</h3>
            <p className="news-description">{description}</p>
            <Link to={link} className="news-link">Xem thêm</Link> {/* Dùng Link */}
        </div>
    );
}

export default NewsItem;