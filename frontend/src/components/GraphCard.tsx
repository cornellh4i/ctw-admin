import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface GraphProps {
  title: string;
}

const GraphCard: FC<GraphProps> = ({ title }) => {
  return (
    <div style={{ flex: 1, margin: 0 }}>
      <Card
        style={{
          boxShadow: '12px 12px #94B0DA',
          border: 'solid',
          borderWidth: '1px',
          borderColor: '#505A5B',
          borderRadius: '10px',
          background: '#EEF2EF',
          height: '30rem',
        }}
      >
        <CardContent className='card-content'></CardContent>
      </Card>
    </div>
  );
};

export default GraphCard;
