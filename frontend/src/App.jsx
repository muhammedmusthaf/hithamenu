import React from 'react';
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom'; // ✅ import BrowserRouter

import './index.css';
import Menu from './components/Menu';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <BrowserRouter> {/* ✅ wrap here */}
      <div className="App">
        <ScrollTop />
        <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/category/:categoryId" element={<Menu />} />
      </Routes>
    </Router>
      </div>
    </BrowserRouter>
  );
}

export default App;
