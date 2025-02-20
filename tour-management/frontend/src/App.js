import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import HotelDetail from './pages/HotelDetail';
import Payment from './pages/Payment';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />
              <Route
                path="/payment/:bookingId"
                element={
                  <PrivateRoute>
                    <Payment />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
