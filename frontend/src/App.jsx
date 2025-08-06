import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categoryId" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
