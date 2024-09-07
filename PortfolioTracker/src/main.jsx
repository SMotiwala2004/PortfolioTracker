import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css'
import App from './App'; // Login component
import Profile from './Profile'; // Profile component

function Main() {

  return (
    <>
    <div className='appName'>
        <header>
          <h1>PortfolioTracker</h1>
        </header>
      </div>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Login page */}
        <Route path="/Profile" element={<Profile />} /> {/* Profile page */}
      </Routes>
      </Router>
    </>
  );
}

export default Main;
