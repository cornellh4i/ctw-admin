// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
        <li>
          <div className='login-button'>
          <Link to="/login">Log In</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
