// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import MusicPlayer from './components/MusicPlayer.js';
import NewsList from './components/NewsList.js';
import ScheduleList from './components/ScheduleList.js';
import NewsDetail from './components/NewsDetail.js';
import BookingForm from './components/BookingForm.js';
import Members from './pages/Members.js'; // Import Members page
import MemberDetail from './components/MemberDetail.js'; // Import MemberDetail
import ContactForm from './components/ContactForm.js';
import './App.css';
function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<MusicPlayer />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/members" element={<Members />} />          {/* Thêm route này */}
          <Route path="/members/:slug" element={<MemberDetail />} /> {/* Route cho trang chi tiết */}
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;