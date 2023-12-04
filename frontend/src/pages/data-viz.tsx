import { useEffect, useState } from "react";
import MapChart from "../components/MapChart";
import LinePlot from "../components/LinePlot";
import "./data_viz.css";

interface Data {
  net_id: number;
  date: Date;
  created_at: Date;
  water_collected: number;
}

const Data_viz = ({}) => {
  // const [data, setData] = useState<Data[]>([]);

  const bottomLeft = [0, 0];
  const topRight = [30, 40];
  const markers = [
    [0, 0],
    [15, 20],
    [30, 40],
  ];

  // useEffect(() => {
  //   async function getData() {
  //     fetch("http://localhost:8000/clusters/", {
  //       method: "GET",
  //     }).then(async (res) => {
  //       const data: Data[] = await res.json();
  //       setData(data);
  //     });
  //   }

  //   getData();
  // });

  const data = [
    {
      net_id: 1234,
      date: new Date("2022-01-02"),
      created_at: new Date("2022-01-02"),
      water_collected: 60,
    },
    {
      net_id: 1235,
      date: new Date("2022-05-16"),
      created_at: new Date("2022-05-016"),
      water_collected: 80,
    },
    {
      net_id: 1345,
      date: new Date("2022-08-02"),
      created_at: new Date("2022-08-02"),
      water_collected: 34,
    },
    {
      net_id: 3203,
      date: new Date("2023-01-01"),
      created_at: new Date("2023-01-01"),
      water_collected: 50,
    },
  ];

  return (
    <>
      <div>
        <h1>Data Visualization</h1>
        <MapChart
          bottomLeft={bottomLeft}
          topRight={topRight}
          markers={markers}
        />
      </div>
      <LinePlot data={data}></LinePlot>
    </>
  );
};

export default Data_viz;
