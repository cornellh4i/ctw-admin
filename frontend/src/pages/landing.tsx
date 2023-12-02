import StatCard from '../components/StatCard';
import Grid from '@mui/material/Grid';
import GraphCard from '../components/GraphCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MapChart from '../components/MapChart';
import { useEffect, useState } from 'react';
const bottomLeft = [-10, -100];
const topRight = [-14, -104];
const markers = [
  [0, 0],
  [15, 20],
  [30, 40],
];


const Landing = () => {
  const [clusterIds, setClusterIds] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  // hard coded values for now
  const bottomLeft = [-10, -100];
  const topRight = [-14, -104];
  const [waterSupplied, setWaterSupplied] = useState(0);
  const [fogNetsInstalled, setFogNetsInstalled] = useState(0);
  const [clustersInstalled, setClustersInstalled] = useState(0);
  const [districtsSupported, setDistrictsSupported] = useState(0);

  const fetchClusterIdsByLocation = async (bottomLeft: number[], topRight: number[]) => {
    try {
      const response = await fetch('https://localhost:8000/clusters/get-clusters-in-range/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bottom_left: bottomLeft,
          top_right: topRight,
        }),
      });
      if (!response.ok) throw new Error('Error fetching cluster ids');
      const data = await response.json();
      setClusterIds(data);
      setClustersInstalled(data.length);
      const districts = new Set();
      data.forEach((item : any) => districts.add(item.district));
      setDistrictsSupported(districts.size);
    } catch (error) {
      console.log('Error fetching cluster ids', error);
    }
  }

  const fetchClusterData = async (clusterIds: number[]) => {
    try {
      const maxDate = new Date();
      const response = await fetch(`https://localhost:8000/clusters/clusterData/max/${maxDate}`);
      if (!response.ok) throw new Error('Error fetching cluster data');
      const data = await response.json(); 
      setClusterData(data);
      let waterSupplied = 0;
      const netIds = new Set();
      data.forEach((item : any) => { 
        waterSupplied += item.water_supplied;
        netIds.add(item.net_id);
      })
      setWaterSupplied(waterSupplied);
      setFogNetsInstalled(netIds.size);
    } catch (error) {
      console.log('Error fetching cluster data', error);
    }
  }

  useEffect(() => { 
    try {
      fetchClusterIdsByLocation(bottomLeft, topRight);
      fetchClusterData(clusterIds);
    } catch (error) {
      console.log('Error fetching cluster ids', error);
    }
  }, []);
  
  return (
    <div>

      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid item sm={3} md={2.5} pt={2}>
          <StatCard num={waterSupplied.toString() + ' L'} text="of Water Supplied" />
        </Grid>
        <Grid item sm={3} md={2.5} pt={2}>
          <StatCard num={fogNetsInstalled.toString()} text="Fog Nets Installed" />
        </Grid>
        <Grid item sm={3} md={2.5} pt={2}>
          <StatCard num={clustersInstalled.toString()} text="Clusters Installed" />
        </Grid>
        <Grid item sm={3} md={2.5} pt={2}>
          <StatCard num={districtsSupported.toString()} text="Districts Supported" />
        </Grid>
        <Grid item sm={3} md={2.5} pt={2}></Grid>
      </Grid>
      
      <Box m={2.5}>
        <Card style={{ boxShadow: "none", borderRadius: "10px", background: "#EEF2EF", height: '18rem' }}>
          <CardContent className='card-content'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ margin: 0 }}>
                <Card style={{ height: '0rem', width: '0rem' }}> </Card>
              </div>
              <MapChart
                bottomLeft={bottomLeft}
                topRight={topRight}
                markers={markers}
              />
              <div style={{ margin: 0 }}>
                <Card style={{ height: '18rem', width: '0rem' }} > </Card>
              </div>


            </div>
          </CardContent>
        </Card>
      </Box>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid item sm={4} md={3.8} pt={3} color='white'>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3} color='white'>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3} color='white'>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}></Grid>
      </Grid>

    </div>
  );
}

export default Landing;
