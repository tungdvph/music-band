// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.js'; // Sửa import: chữ 'h' thường và thêm .js
// import các page khác.
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* các Route khác. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;