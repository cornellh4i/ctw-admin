import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface GraphProps {
  title: string;
}

const GraphCard: FC<GraphProps> = ({ title }) => {
  return (
    <div style={{ flex: 1, margin: 20 }}>
      <h1 style={{ fontSize: '25px' }}> {title}</h1>
      <Card
        style={{
          boxShadow: 'none',
          borderRadius: '10px',
          background: '#EEF2EF',
          height: '18rem',
        }}
      >
        <CardContent className='card-content'></CardContent>
      </Card>
    </div>
  );
};

export default GraphCard;
