import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'; // ✅ import BrowserRouter

import './index.css';
import Menu from './components/Menu';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <BrowserRouter> {/* ✅ wrap here */}
      <div className="App">
        <ScrollTop />
        <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
