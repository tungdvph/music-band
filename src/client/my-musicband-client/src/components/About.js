// client/src/components/About.js
import React from "react";
import './About.css'
const About = () => {
    return (
        <section className="about">
            <h2>Về chúng tôi</h2>
            <p>
                Chào mừng bạn đến với trang web chính thức của [Tên Band Nhạc]!
                Chúng tôi là một ban nhạc [Phong cách âm nhạc] đến từ [Thành phố].
            </p>
            <p>
                Được thành lập vào [Năm thành lập], chúng tôi đã có [Số năm] năm kinh nghiệm biểu diễn
                tại [Các địa điểm/sự kiện]. Âm nhạc của chúng tôi là sự kết hợp giữa
                [Các yếu tố âm nhạc], mang đến cho người nghe những trải nghiệm
                [Tính từ mô tả trải nghiệm âm nhạc].
            </p>
            <p>
                Các thành viên của ban nhạc bao gồm:
            </p>
            <ul>
                <li>[Tên thành viên 1] - [Vị trí/Nhạc cụ]</li>
                <li>[Tên thành viên 2] - [Vị trí/Nhạc cụ]</li>
                {/* Thêm các thành viên khác */}
            </ul>
            <p>
                Hãy cùng chúng tôi khám phá thế giới âm nhạc đầy màu sắc và đam mê!
            </p>
        </section>
    )
}

export default About;