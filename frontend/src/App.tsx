import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Admin from "./pages/admin";
import Data_viz from "./pages/data-viz";
import Navbar from "./components/navbar";
import Filter from "./components/Filter";

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
  return (
    // <Router>
    //   <Navbar />

    //   <Routes>
    //     <Route path='/' element={<Landing />} />
    //     <Route path='/admin' element={<Admin />} />
    //     <Route path='/dataviz' element={<Data_viz />} />
    //   </Routes>
    // </Router>
    <Filter locations={locations} meshTypes={meshes} />
  );
}

export default App;
