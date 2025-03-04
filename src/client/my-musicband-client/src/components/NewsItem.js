// client/src/components/NewsItem.js
import React from 'react';
import './NewsItem.css'

function NewsItem({ title, image, description, link }) {
    return (
        <div className="news-item">
            <img src={image} alt={title} className="news-image" />
            <h3 className="news-title">{title}</h3>
            <p className="news-description">{description}</p>
            <a href={link} className="news-link">Xem thêm</a>
        </div>
    );
}

export default NewsItem;