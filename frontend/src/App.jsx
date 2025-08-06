import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'; // ✅ import BrowserRouter

import './index.css';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter> {/* ✅ wrap here */}
      <div className="App">
       <Routes>
        <Route path="/" element={<Menu />} />
      </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App;
