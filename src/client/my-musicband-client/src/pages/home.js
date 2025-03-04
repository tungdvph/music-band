// client/src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import NewsList from '../components/NewsList'; // Import component NewsList
import ScheduleList from '../components/ScheduleList'; // Import
import './home.css'; // Import CSS cho trang Home

function Home() {
    return (
        <div className="home-page">
            <Hero />
            <About />
            <NewsList />
            <ScheduleList />
            {/* Thêm các phần khác (Featured Music, Newsletter Signup, ...) */}
        </div>
    );
}

export default Home;