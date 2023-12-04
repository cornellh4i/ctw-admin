// src/Navbar.js
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import { Box } from '@mui/material';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ background: "#FFFFFF" }}>
        <li><Link to="/admin">About Us</Link></li>
        <li><Link to="/dataviz">Custom Visualization</Link></li>
        <li><Link to="/">Home</Link></li>
        <img src={logo} alt="" width="250" height="57" />

      </ul>
    </nav>

  );
}

export default Navbar;
