import React from "react";
import MapChart from "../components/MapChart";

const Data_viz = ({
}) => {

  const bottomLeft = [0, 0];
  const topRight = [30, 40];
  const markers = [[0, 0], [15, 20], [30, 40]];  
  return (
    <div>
      <h1>Data_viz</h1>
      <MapChart bottomLeft={bottomLeft} topRight={topRight} markers={markers} />
    </div>
  );
};

export default Data_viz;