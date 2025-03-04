// client/src/components/Hero.js
import React from 'react';
import './Hero.css'; // Import CSS cho Hero

function Hero() {
    return (
        <section className="hero">
            <img src="/images/band-image.jpg" alt="Band Name" className="hero-image" />
            <div className="hero-content">
                <h1 className="band-name">Tên Band Nhạc</h1>
                <p className="band-slogan">Slogan hoặc giới thiệu ngắn</p>
                <button className="cta-button">Nghe Nhạc Ngay</button>
            </div>
        </section>
    );
}

export default Hero;