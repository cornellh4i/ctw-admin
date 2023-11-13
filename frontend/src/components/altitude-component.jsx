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

const AltitudeComponent = ({ minAlt, maxAlt }) => {
  const [value, setValue] = React.useState([minAlt, maxAlt]);

  const handleChangeCommitted = (event, newValue) => {
    if (newValue[0] > newValue[1]) {
      setValue([newValue[1], newValue[0]]);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box display="flex" sx={{ justifyContent: "center" }} border={1} borderColor="transparent">
      <Box sx={{ width: 300 }}>
        <Slider
          max={4000}
          getAriaLabel={() => 'Altitude range'}
          value={value}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </Box>
  );
}

export default AltitudeComponent;