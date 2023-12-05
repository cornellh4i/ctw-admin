import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import placeholderGraph from '../images/placeholderGraph.png';

interface GraphProps {
  title: string;
  placeholder: boolean;
}

const GraphCard: FC<GraphProps> = ({ title, placeholder }) => {
  return (
    <div style={{ flex: 1, margin: 0 }}>
      <Card
        style={{
          boxShadow: '12px 12px #94B0DA',
          border: 'solid',
          borderWidth: '1px',
          borderColor: '#505A5B',
          borderRadius: '10px',
          background: 'white',
          height: '30rem',
        }}
      >
        <CardContent className='card-content'>
          {placeholder ? (
            <img
              src={placeholderGraph}
              alt='placeholder graph'
              width='100%'
              height='100%'
              style={{ marginTop: '2.5rem' }}
            />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphCard;
