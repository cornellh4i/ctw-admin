import React from "react";
import MapChart from "../components/MapChart";
import LineGraph from "../components/LineGraph";

const Data_viz = ({}) => {
  const bottomLeft = [0, 0];
  const topRight = [30, 40];
  const markers = [
    [0, 0],
    [15, 20],
    [30, 40],
  ];

  const data = [
    { date: "2023-01-01", waterQuantity: 50, variable1: 25, variable2: 30 },
    { date: "2023-01-02", waterQuantity: 60, variable1: 35, variable2: 40 },
    // Add more data objects as needed
  ];

  return (
    <>
      <div>
        <h1>Data_viz</h1>
        <MapChart
          bottomLeft={bottomLeft}
          topRight={topRight}
          markers={markers}
        />
      </div>
      <div>
        <LineGraph data={data}></LineGraph>
      </div>
    </>
  );
};

export default Data_viz;
