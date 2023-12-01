import StatCard from '../components/StatCard';
import Grid from '@mui/material/Grid';
import GraphCard from '../components/GraphCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import MapChart from '../components/MapChart';


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
      <h1 style={{ marginLeft: "20px" }}> Map Header</h1>
      <Box m={2.5}>
        <Card style={{ boxShadow: "none", borderRadius: "10px", background: "#EEF2EF", height: '18rem' }}>
          <CardContent className='card-content'>

          </CardContent>
        </Card>
      </Box>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Grid item sm={4} md={3.8} pt={3}>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}>
          <GraphCard title="Graph Header" />
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}></Grid>
      </Grid>
    </div>
  );
}

export default Landing;
