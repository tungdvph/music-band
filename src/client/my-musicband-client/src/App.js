// client/src/App.js
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
import Members from './pages/Members.js';
import MemberDetail from './components/MemberDetail.js';
import ContactForm from './components/ContactForm.js';
import Login from './components/Login.js';       // Import
import Register from './components/Register.js'; // Import
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
          <Route path="/members" element={<Members />} />
          <Route path="/members/:slug" element={<MemberDetail />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<Login />} />        {/* Thêm route */}
          <Route path="/register" element={<Register />} />  {/* Thêm route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;