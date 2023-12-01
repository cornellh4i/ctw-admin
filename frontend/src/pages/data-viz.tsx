import { useEffect } from "react";
import MapChart from "../components/MapChart";
import AltitudeComponent from "../components/altitude-component";
import MeshSelector from "../components/MeshSelector";
import GraphCard from "../components/GraphCard";
import LocationSelector from "../components/LocationSelector";

const fetchClustersHandler = async () => {
  try {
    const response = await fetch("http://localhost:8000/clusters");
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const Data_viz = () => {
  useEffect(() => {
    fetchClustersHandler();
  }, []);
  const bottomLeft = [-10, -100];
  const topRight = [-14, -104];
  const markers = [
    [0, 0],
    [15, 20],
    [30, 40],
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <MeshSelector typeList={["test1", "test2"]} />
        <LocationSelector typeList={["location1", "location2", "location 3"]} />
        <MeshSelector typeList={["test1", "test2"]} />
        <AltitudeComponent minAlt={1000} maxAlt={2000} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MapChart
          bottomLeft={bottomLeft}
          topRight={topRight}
          markers={markers}
        />
        <GraphCard title="graph goes here" />
      </div>
    </div>
  );
};

export default Data_viz;
