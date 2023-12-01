import StatCard from '../components/StatCard';
import Grid from '@mui/material/Grid';
import GraphCard from '../components/GraphCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MapChart from '../components/MapChart';
const bottomLeft = [-10, -100];
const topRight = [-14, -104];
const markers = [
  [0, 0],
  [15, 20],
  [30, 40],
];


const Landing = () => {
  return (
    <div>

      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid item sm={4} md={3.8} pt={3}>
          <StatCard num="1 L" text="of Water Supplied" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}>
          <StatCard num="2" text="Fog Nets Installed" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}>
          <StatCard num="3" text="Clusters Installed" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}></Grid>
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
