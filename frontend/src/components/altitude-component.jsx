import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const AltitudeComponent = ({ minAlt, maxAlt }) => {
  const [value, setValue] = React.useState([minAlt, maxAlt]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box display="flex" sx={{ justifyContent: "center" }} border={1} borderColor="transparent">
      <Box sx={{ width: 300 }}>
        <Slider
          max={4000}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}

export default AltitudeComponent;