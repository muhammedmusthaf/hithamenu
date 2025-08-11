import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Menu from './components/Menu';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const RestaurantLogo = () => (
    <div className="restaurant-logo">
      <div className="logo-image-container">
        <img 
          src="assets/hitha.jpg" 
          alt="Hitha Family Restaurant Logo" 
          className="main-logo"
        />
      </div>
      
      <div className="logo-text">
        <h1>HITHA</h1>
        <p>THE FAMILY RESTAURANT</p>
      </div>
      
      <div className="ornamental-line">
        <div className="decorative-swirl left"></div>
        <div className="center-dot"></div>
        <div className="decorative-swirl right"></div>
      </div>
    </div>
  );

  const LoaderPage = () => (
    <div className="loader-page">
      <div className="loader-background"></div>
      <div className="loader-container">
        <div className="logo-fixed">
          <RestaurantLogo />
        </div>
      </div>
      <div className="loading-dots">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="dot" style={{ animationDelay: `${i * 0.10}s` }}></div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;