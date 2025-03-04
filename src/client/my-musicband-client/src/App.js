// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js'; // Import Navbar
import MusicPlayer from './components/MusicPlayer.js';
import NewsList from './components/NewsList.js';
import ScheduleList from './components/ScheduleList.js'
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar /> {/* Thêm Navbar vào đây */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<MusicPlayer />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;