// client/src/components/NewsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem'; // Import NewsItem component
import './NewsList.css'
function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách tin tức (ví dụ)
        axios.get('/api/news') // Sửa URL cho phù hợp với API của bạn
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                // Xử lý lỗi (hiển thị thông báo, ...)
            });
    }, []);

    return (
        <section className='news-list'>
            <h2>Tin tức mới nhất</h2>
            <div className='news-container'>
                {news.map(item => (
                    <NewsItem
                        key={item.id} //  sử dụng key khi render danh sách
                        title={item.title}
                        image={item.image}
                        description={item.description}
                        link={item.link}
                    />
                ))}
            </div>
        </section>
    );
}

export default NewsList;