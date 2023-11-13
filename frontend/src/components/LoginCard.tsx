import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./LoginCard.css";

const LoginCard = () => {
  return (
    <Card className="login-card">
      <CardContent className='card-content'>
        <h1 style={{fontSize: "25px", textAlign:"center"}}> NGO Log In</h1>
        <h2 style={{fontSize: "20px"}}> Email</h2>
        <input style={{height: "1.5rem", minWidth: "20rem"}} />
        <h2 style={{fontSize: "20px"}}> Password</h2>
        <input style={{height: "1.5rem", minWidth: "20rem"}} />
        <h3 style={{fontSize: "15px", textAlign:"center", textDecoration: "underline"}}> Forgot Password?</h3>
        <div style={{textAlign:"center"}}><button className="login-button" onClick={() => alert('hello')}>Log In</button></div>
      </CardContent>
    </Card>
  )
};

export default LoginCard;