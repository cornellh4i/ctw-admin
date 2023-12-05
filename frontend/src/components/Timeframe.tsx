import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from 'recharts';
// for recharts v2.1 and above
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

/* Require: dateNumber is value of Date.getTime()
   Return: date in YYYY-MM-DD string.
   Note: all the date is in UTC time*/
function formattedDate(dateNumber: number): string {
  const date = new Date(dateNumber);
  const dateUTC = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  return [
    dateUTC.getFullYear(),
    (dateUTC.getMonth() + 1).toString().padStart(2, '0'),
    dateUTC.getDate().toString().padStart(2, '0'),
  ].join('-');
}

// Min, max date
const marks = [new Date('2023-01-01'), new Date()];

// Generating dummy data for bar chart
function generateDummyData(startDate: Date, numberOfDays: number) {
  const data = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numberOfDays; i++) {
    const value = Math.floor(Math.random() * 400); // Random value from 0 - 400
    data.push({
      name: currentDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      value: value,
    });
    currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
  }

  return data;
}

// Raw dummy data
const rawData = generateDummyData(
  new Date('2023-01-01'),
  (marks[1].getTime() - marks[0].getTime()) / (1000 * 60 * 60 * 24)
);

type DataPoint = {
  name: string; // Assume'YYYY-MM-DD' format
  value: number;
};

type MonthSum = {
  name: string; // 'YYYY-MM'
  value: number;
};

// Helper function to group and sum values by month
const groupByMonth = (data: DataPoint[]): MonthSum[] => {
  const sums: Record<string, MonthSum> = data.reduce(
    (acc: Record<string, MonthSum>, { name, value }: DataPoint) => {
      const month: string = name.substring(0, 7); // 'YYYY-MM'
      if (!acc[month]) {
        acc[month] = { name: month, value: 0 };
      }
      acc[month].value += value;
      return acc;
    },
    {}
  );

  return Object.values(sums);
};

const groupedData: MonthSum[] = groupByMonth(rawData);

const TimeframeComponent: React.FC<{ minDate: Date; maxDate: Date }> = ({
  minDate,
  maxDate,
}) => {
  let [dates, setDates] = React.useState<number[]>([
    minDate.getTime(),
    maxDate.getTime(),
  ]);
  const minDistance = 0;

  // Handle date change when change date on slider
  const handleSliderChange = (
    event: Event,
    newDates: number | number[],
    activeThumb: number
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
  const handleBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newDate = new Date(event.target.value).getTime();
    let updatedDates = [...dates];
    if (index === 0) {
      updatedDates = [Math.min(newDate, dates[1] - minDistance), dates[1]];
    } else {
      updatedDates = [dates[0], Math.max(dates[0] + minDistance, newDate)];
    }
    setDates(updatedDates);
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div
          className='custom-tooltip'
          style={{
            borderRadius: '10px',
            border: 'solid',
            borderWidth: '1px',
            borderColor: '#505A5B',
            background: '#EEF2EF',
            opacity: '60%',
          }}
        >
          <p className='label'>{`${label} : ${payload?.[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  // HAVE NOT AGGREGATE DATA FROM BACKEND, BARCHART UNFINISHED
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      border={1}
      borderColor='transparent'
    >
      {/* Responsive BarChart from recharts */}
      <ResponsiveContainer width='100%' height={150}>
        <BarChart data={groupedData}>
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' fill='#1DC3DA' />
        </BarChart>
      </ResponsiveContainer>

      {/* Box containing the Slider */}
      <Box sx={{ width: '100%' }}>
        <Slider
          getAriaLabel={() => 'Timeframe Slider'}
          value={dates}
          onChange={handleSliderChange}
          valueLabelDisplay='off'
          disableSwap
          min={marks[0].getTime()}
          max={marks[1].getTime()}
        />
      </Box>

      {/* Box containing the 2 date input Boxes */}
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box sx={{ marginRight: 0 }}>
          <input
            type='date'
            min={formattedDate(marks[0].getTime())}
            max={formattedDate(marks[1].getTime())}
            value={formattedDate(dates[0])}
            onChange={(event) => handleBoxChange(event, 0)}
            required
          />
        </Box>

        <Box
          sx={{
            height: '1px',
            width: '46px',
            bgcolor: '#000',
            mx: '13px',
          }}
        />

        <Box sx={{ marginLeft: 0 }}>
          <input
            type='date'
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
};

export default TimeframeComponent;
