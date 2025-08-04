import React from 'react';

import './index.css';
import Menu from './components/Menu';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <div className="App">
      <ScrollTop/>
      <Menu />
    </div>
  );
}

export default App;