import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

/* Require: dateNumber is value of Date.getTime()
   Return: date in YYYY-MM-DD string.
   Note: Need to include dateUTC to account for difference in time zone */
function formattedDate(dateNumber : number): string {
    const date = new Date(dateNumber);
    const dateUTC = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
   
    return [
      dateUTC.getFullYear(),
      (dateUTC.getMonth() + 1).toString().padStart(2, '0'),
      dateUTC.getDate().toString().padStart(2, '0')
    ].join('-');
}

// Min, max date
const marks = [
  new Date('2023-01-01'),
  new Date()
]

const TimeframeComponent: React.FC<{ minDate: Date, maxDate: Date}> = ({ minDate, maxDate}) => {
    let [dates, setDates] = React.useState<number[]>([minDate.getTime(), maxDate.getTime()]);
    const minDistance = 0;

    // Handle date change when change date on slider
    const handleSliderChange = (
      event: Event,
      newDates: number | number[],
      activeThumb: number,
    ) => {
      if (!Array.isArray(newDates)) {
        return;
      }


      if (activeThumb === 0) {
        setDates([Math.min(newDates[0], newDates[1] - minDistance), newDates[1]]);
      } else {
        setDates([newDates[0], Math.max(newDates[1], newDates[0] + minDistance)]);
      }
    };


    // Handle date change when input new date in boxes
    const handleBoxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDate = new Date(event.target.value).getTime();
        let updatedDates = [...dates];
        if (index === 0) {
          updatedDates = [Math.min(newDate, dates[1] - minDistance), dates[1]];
        }
        else {
          updatedDates = [dates[0], Math.max(dates[0] + minDistance, newDate)]
        }
        setDates(updatedDates);
    };


    // MISSING BARGRAPH
    return (
      <Box display="flex" flexDirection="column" alignItems="center" border={1} borderColor="transparent">
        {/* Box containing the Slider */}
        <Box sx={{ width: "15em" }}>
          <Slider
            getAriaLabel={() => "Timeframe Slider"}
            value={dates}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            disableSwap
            min={marks[0].getTime()}
            max={marks[1].getTime()}
          />
        </Box>

        {/* Box containing the 2 date input Boxes */}
        <Box display="flex" justifyContent="center">
          <Box sx={{ marginRight: 1 }}>
            <input
              type="date"
              min={formattedDate(marks[0].getTime())}
              max={formattedDate(marks[1].getTime())}
              value={formattedDate(dates[0])}
              onChange={(event) => handleBoxChange(event, 0)}
              required
            />
          </Box>

          <Box sx={{ marginLeft: 1 }}>
            <input
              type="date"
              min={formattedDate(marks[0].getTime())}
              max={formattedDate(marks[1].getTime())}
              value={formattedDate(dates[1])}
              onChange={(event) => handleBoxChange(event, 1)}
              required
            />
          </Box>
        </Box>
      </Box>
    );
}      


export default TimeframeComponent;

