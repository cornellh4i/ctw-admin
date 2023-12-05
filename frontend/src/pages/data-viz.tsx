import MapChart from '../components/MapChart';
import MeshSelector from '../components/MeshSelector';
import SliderSelector from '../components/SliderSelector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './data-viz.css';
import { useEffect, useState } from 'react';
import AltitudeComponent from '../components/altitude-component';
import GraphCard from '../components/GraphCard';
import LocationSelector from '../components/LocationSelector';

const Data_viz = () => {
  const initalData: { id: string; location: number[] }[] = [];
  const [markers, setMarkers] = useState(initalData);

  const fetchClustersHandler = async () => {
    try {
      const response = await fetch('http://localhost:8000/clusters');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      let loadedMarkers = [];
      const data = await response.json();
      for (const key in data) {
        loadedMarkers.push({
          id: data[key]['_id'],
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
  const bottomLeft = [-15, -175];
  const topRight = [-20, -165];
  // const markers = [
  //   [0, 0],
  //   [15, 20],
  //   [30, 40],
  // ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '1rem',
          flex: 1,
        }}
      >
        <MeshSelector
          typeList={[
            'Villa Maria Del Triunfo',
            'Nueva Ezperanza',
            'Quebrada Paraiso',
            'Vallecito Alto',
          ]}
          title={'Location'}
        />
        <MeshSelector
          typeList={['Raschel', 'Stainless Steel', '3D Net']}
          title={'Mesh Type'}
        />
        <SliderSelector
          title='Time Frame'
          min={new Date('01-01-2023')}
          max={new Date()}
        />
        <SliderSelector title='Altitude' min={1000} max={2000} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 5 }}>
        <div
          style={{
            height: '30rem',
            flex: 1,
            boxShadow: '12px 12px #94B0DA',
            borderRadius: '10px',
            border: 'solid',
            borderWidth: '1px',
            borderColor: '#505A5B',
            background: '#EEF2EF',
            padding: 0,
            margin: '2rem',
          }}
        >
          <MapChart
            bottomLeft={bottomLeft}
            topRight={topRight}
            markers={markers}
          />
        </div>
        <div
          style={{
            margin: '2rem',
            flex: 1,
          }}
        >
          <GraphCard title='graph goes here' placeholder={true} />
        </div>
      </div>
    </div>
  );
};

export default Data_viz;
