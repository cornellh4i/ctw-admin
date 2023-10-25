import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MapChart from './components/MapChart';
import Landing from './pages/landing';
import Admin from './pages/admin';
import Data_viz from './pages/data-viz';
import Navbar from './components/navbar';



function App() {
  const bottomLeft = [0, 0];
  const topRight = [30, 40];
  const markers = [[0, 0], [15, 20], [30, 40]];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/page1" element={<Admin />} />
        <Route path="/page2" element={<Data_viz />} />
      </Routes>
    </Router>
  );
}

export default App;
