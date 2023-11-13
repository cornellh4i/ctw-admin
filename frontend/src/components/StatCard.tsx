import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface StatProps {
  num: string;
  text: string;
}

const StatCard: FC<StatProps> = ({ num, text }) => {
  return (
    <Card style={{ boxShadow: "none", borderRadius: "10px", background: "#EEF2EF" }}>
      <CardContent className='card-content'>
            <h1 style={{textAlign: "center", fontSize: "2rem"}}>{num} {text}</h1>
      </CardContent>
    </Card>
  );
};

export default StatCard;