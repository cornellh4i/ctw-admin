
import MapChart from '../components/MapChart';
import MeshSelector from '../components/MeshSelector';
import SliderSelector from '../components/SliderSelector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './data-viz.css';
import { useEffect, useState } from "react";
import AltitudeComponent from "../components/altitude-component";
import GraphCard from "../components/GraphCard";
import LocationSelector from "../components/LocationSelector";

const Data_viz = () => {
  const initalData: { id: string; location: number[] }[] = [];
  const [markers, setMarkers] = useState(initalData);

  const fetchClustersHandler = async () => {
    try {
      const response = await fetch("http://localhost:8000/clusters");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      let loadedMarkers = [];
      const data = await response.json();
      for (const key in data) {
        loadedMarkers.push({
          id: data[key]["_id"],
          location: data[key].location,
        });
      }
      setMarkers(loadedMarkers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClustersHandler();
  }, []);
  const bottomLeft = [-10, -100];
  const topRight = [-14, -104];
  // const markers = [
  //   [0, 0],
  //   [15, 20],
  //   [30, 40],
  // ];
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
        <SliderSelector title="Time Frame" min={new Date('01-01-2023')} max={new Date()} />
        <SliderSelector title="Altitude" min={1000} max={2000} />
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
