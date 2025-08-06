import React from 'react';
import { Router,Routes,Route } from 'react-router-dom'; // ✅ import BrowserRouter

import './index.css';
import Menu from './components/Menu';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    
      <div className="App">
        <ScrollTop />
        <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/category/:categoryId" element={<Menu />} />
      </Routes>
    </Router>
      </div>
  
  );
}

export default App;
