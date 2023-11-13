import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Admin from './pages/admin';
import Data_viz from './pages/data-viz';
import Login from './pages/login'
import Forms from './pages/forms'
import Navbar from './components/navbar';

function App() {
  const bottomLeft = [-30, -10];
  const topRight = [40, 30];
  const markers = [
    [-30, -10],
    [5, 10],
    [40, 30],
  ];

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/dataviz' element={<Data_viz />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forms' element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;
