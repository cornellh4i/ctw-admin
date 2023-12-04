import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Admin from "./pages/admin";
import Data_viz from "./pages/data-viz";
import Login from "./pages/login";
import Forms from "./pages/forms";
import Navbar from "./components/navbar";


function App() {
  const bottomLeft = [-30, -10];
  const topRight = [40, 30];
  const markers = [
    [-30, -10],
    [5, 10],
    [40, 30],
  ];
  const locations = ["Ithaca", "Saigon", "Long Island", "New York"];
  const meshes = ["Raschel", "Stainless", "3D Net"];
  const locationElement = (
    <p className="filter-location">
      <label htmlFor="location">Location</label>
      <select id="location">
        <option disabled selected>
          -- select an option--
        </option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </p>
  );
  const meshElement = (
    <p className="filter-mesh-type">
      <p>Mesh Type</p>
      {meshes.map((meshType) => (
        <div key={meshType}>
          <input type="radio" id={meshType} name="meshType"></input>
          <label htmlFor={meshType}>{meshType}</label>
        </div>
      ))}
    </p>
  );
  const components = [locationElement, meshElement];
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dataviz" element={<Data_viz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;
