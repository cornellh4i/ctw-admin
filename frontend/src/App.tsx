import React from 'react';
import './App.css';
import MapChart from './MapChart';

function App() {
  const bottomLeft = [-30,-10];
  const topRight = [40,30];
  const markers = [[-30,-10], [5,10], [40,30]];

  return (
    <div className="App">
      <MapChart bottomLeft={bottomLeft} topRight={topRight} markers={markers} />
    </div>
  );
}

export default App;
