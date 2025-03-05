// client/src/components/NewsList.js 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import './NewsList.css';

function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/news')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Đang tải tin tức...</div>;
    }

    if (error) {
        return <div>Có lỗi xảy ra: {error.message}</div>;
    }

    return (
        <section className='news-list'>
            <h2>Tin tức mới nhất</h2>
            <div className='news-container'>
                {news.map(item => (
                    <NewsItem
                        key={item._id}
                        title={item.title}
                        image={item.image}
                        description={item.description}
                        link={`/news/${item.slug}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default NewsList;