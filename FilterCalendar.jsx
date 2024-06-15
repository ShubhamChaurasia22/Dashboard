import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDateFilter, clearDateFilter, fetchDataAndExtractFilters } from '../store/slice/table';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const FilterCalendar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.table.selectedDate);

  const handleDateChange = (date) => {
    const dateString = dayjs(date).format('DD-MM-YYYY');
    dispatch(setDateFilter(dateString));
    dispatch(fetchDataAndExtractFilters());
  };

  const handleClearDate = () => {
    dispatch(clearDateFilter());
    dispatch(fetchDataAndExtractFilters());
  };

  return (
    <>
      <div className='calendar-selected-dropdown'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Select Date"
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        {selectedDate && (
          <div className='clear-btns'>
            <Button onClick={handleClearDate} variant="outlined">Clear</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterCalendar;
