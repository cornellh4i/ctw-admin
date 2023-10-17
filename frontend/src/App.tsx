import React from 'react';
import './App.css';
import MapChart from './MapChart';

function App() {
  const bottomLeft = [0,0];
  const topRight = [30,40];
  const markers = [[0,0], [15,20], [30,40]];

  return (
    <div className="App">
      <MapChart bottomLeft={bottomLeft} topRight={topRight} markers={markers} />
    </div>
  );
}

export default App;
