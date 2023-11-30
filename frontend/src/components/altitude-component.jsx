import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0 m',
  },
  {
    value: 4000,
    label: '4000 m',
  },
];

const minDistance = 10;


const AltitudeComponent = ({ minAlt, maxAlt }) => {
  const [value, setValue] = React.useState([minAlt, maxAlt]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };



  return (
    <Box display="flex" sx={{ justifyContent: "center" }} border={1} borderColor="transparent">
      <Box sx={{ width: "15em" }}>
        <Slider
          max={4000}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={value => <div> {value} m </div>}
          marks={marks}
          disableSwap
        />
      </Box>
    </Box>
  );
}

export default AltitudeComponent;