import StatCard from '../components/StatCard';
import Grid from '@mui/material/Grid';
import GraphCard from '../components/GraphCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MapChart from '../components/MapChart';
import { useEffect, useState } from 'react';
const bottomLeftMap = [-10, -100];
const topRightMap = [-14, -104];
const markers = [
  [0, 0],
  [15, 20],
  [30, 40],
];

const Landing = () => {
  const [clusterIds, setClusterIds] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  // hard coded values for now
  const bottomLeft = [-79.05, -60.2];
  const topRight = [430.29, 40.21];
  const [waterSupplied, setWaterSupplied] = useState(0);
  const [fogNetsInstalled, setFogNetsInstalled] = useState(0);
  const [clustersInstalled, setClustersInstalled] = useState(0);
  const [districtsSupported, setDistrictsSupported] = useState(0);

  const fetchClusterIdsByLocation = async (bottomLeft: number[], topRight: number[]) => {
    try {
      const response = await fetch('http://localhost:8000/clusters/get-clusters-in-range/', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lower_left: bottomLeft,
          upper_right: topRight,
        }),
        method: 'POST',
      });
      if (!response.ok) throw new Error('Error fetching cluster ids 2');
      const data = await response.json();
      const clusterIds = data.data.map((item : any) => item._id);
      setClusterIds(clusterIds);
      setClustersInstalled(data.data.length);
      const districts = new Set();
      data.data.forEach((item : any) => districts.add(item.district));
      setDistrictsSupported(districts.size);
    } catch (error) {
      console.log('Error fetching cluster ids 1', error);
    }
  }

  const fetchClusterData = async (clusterIds: number[]) => {
    try {
      const maxDate = new Date();
      const year = maxDate.getFullYear(); // Get the year (YYYY)
      const month = String(maxDate.getMonth() + 1).padStart(2, '0'); // Get the month (MM)
      const day = String(maxDate.getDate()).padStart(2, '0'); // Get the day (DD)
      const formattedDate = `${year}-${month}-${day}`;
  
      const response = await fetch(`http://localhost:8000/clusters/clusterData/max/${formattedDate}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clusterIds : clusterIds.toString()
        }),
        method: 'POST'
      });
      if (!response.ok) throw new Error('Error fetching cluster data 2');
      const data = await response.json(); 
      setClusterData(data);
      let waterSupplied = 0;
      const netIds = new Set();
      if (Array.isArray(data.data)) {
        data.data.forEach((item : any) => { 
          waterSupplied += item.water_collected;
          netIds.add(item.netID);
        });
      }
      waterSupplied = parseFloat(waterSupplied.toFixed(2));
      setWaterSupplied(waterSupplied);
      setFogNetsInstalled(netIds.size);
    } catch (error) {
      console.log('Error fetching cluster data 1', error);
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
          <StatCard num={waterSupplied.toString()} text="L of Water Supplied" />
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
                bottomLeft={bottomLeftMap}
                topRight={topRightMap}
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
