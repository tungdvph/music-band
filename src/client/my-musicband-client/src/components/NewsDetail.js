// client/src/components/NewsDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function NewsDetail() {
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        axios.get(`/api/news/${slug}`)
            .then(response => {
                setNewsItem(response.data);
                console.log("newsItem:", response.data); // Thêm dòng này
            })
            .catch(error => {
                console.error("Error fetching news item:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);


    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Có lỗi xảy ra: {error.message}</div>;
    }

    if (!newsItem) {
        return <div>Không tìm thấy bài viết.</div>;
    }

    return (
        <div>
            <h1>{newsItem.title}</h1>
            {/* Sửa ở đây, dùng template literal */}
            <img src={`/${newsItem.image}`} alt={newsItem.title} style={{ maxWidth: "100%" }} />
            <p>{newsItem.content}</p>
            {newsItem.author && (
                <p>Tác giả: {newsItem.author.username || newsItem.author.email}</p>
            )}
        </div>
    );
}

export default NewsDetail;