// client/src/pages/Members.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberList from '../components/MemberList';

function Members() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/members') // Gọi API, thay bằng endpoint của bạn
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error("Error fetching members:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Đang tải danh sách thành viên...</div>;
    }

    if (error) {
        return <div>Có lỗi xảy ra: {error.message}</div>;
    }

    return (
        <div>
            <h1>Thành viên ban nhạc</h1>
            <MemberList members={members} />
        </div>
    );
}

export default Members;