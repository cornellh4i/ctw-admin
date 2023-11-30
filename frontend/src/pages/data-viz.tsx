import MapChart from '../components/MapChart';
import MeshSelector from '../components/MeshSelector';
import SliderSelector from '../components/SliderSelector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './data-viz.css';

const Data_viz = () => {
  const bottomLeft = [-10, -100];
  const topRight = [-14, -104];
  const markers = [
    [0, 0],
    [15, 20],
    [30, 40],
  ];
  return (
    <div>
      <div className="filters-container">
        <MeshSelector title="Mesh Type" typeList={['type 1', 'type 2']} />
        <MeshSelector title="Location" typeList={['location 1', 'location 2', 'location 3']} />
        <SliderSelector title="Time Frame" min={1000} max={2000} />
        <SliderSelector title="Altitude" min={1000} max={2000} />
      </div>
      <div className="graphs-container">
        <MapChart bottomLeft={bottomLeft} topRight={topRight} markers={markers} />
        <div style={{ flex: 1, margin: 20 }}>
          <Card style={{ boxShadow: 'none', borderRadius: '10px', background: '#EEF2EF', height: '24rem' }}>
            <CardContent className='card-content'>GRAPH HERE</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Data_viz;
