import Grid from '@mui/material/Grid';
import GraphCard from '../components/GraphCard';

const Forms = () => {
    return (
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center" sx={{ minHeight: '90vh' }}>
        <Grid item sm={4} md={3.8} pt={3}>
            <GraphCard title="Previous Forms"/>
        </Grid>
        <Grid item sm={4} md={3.8} pt={3}>
          <GraphCard  title="New Form"/>
        </Grid>
      </Grid>
    );
  }

  export default Forms;
  