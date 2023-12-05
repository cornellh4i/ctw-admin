import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface StatProps {
  num: string;
  text: string;
}

const StatCard: FC<StatProps> = ({ num, text }) => {
  return (
    <Card
      style={{
        boxShadow: '12px 12px #94B0DA',
        border: 'solid',
        borderWidth: '1px',
        borderColor: '#505A5B',
        borderRadius: '10px',
        background: '#EEF2EF',
      }}
    >
      <CardContent
        className='card-content'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginRight: '5px' }}>{num}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1rem' }}>{text}</h1>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
