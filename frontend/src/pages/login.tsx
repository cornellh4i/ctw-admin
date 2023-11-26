import Grid from '@mui/material/Grid';
import LoginCard from '../components/LoginCard';

const Login = () => {
    return (
      <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
        <Grid item>
          <LoginCard />
        </Grid>
      </Grid>
    );
  }
  
  export default Login;
  