// src/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ background: "#5f9ea0" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/dataviz">Data Viz</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
