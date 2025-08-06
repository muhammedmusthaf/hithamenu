import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './index.css';
import Menu from './components/Menu';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <div className="App">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/category/:categoryId" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
