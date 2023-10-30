import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Admin from './pages/admin';
import Data_viz from './pages/data-viz';
import Navbar from './components/navbar';
import { getAuth, RecaptchaVerifier } from "firebase/auth";


function App() {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

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
