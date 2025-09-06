import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ReportPage from './pages/ReportPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
