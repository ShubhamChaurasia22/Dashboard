import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterDateRange, fetchDataAndExtractFilters } from '../store/slice/table';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const FilterCalendarRange = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(state => state.table.startDate);
  const endDate = useSelector(state => state.table.endDate);

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const [startDate, endDate] = dates;
      const startDateString = startDate ? dayjs(startDate).format('DD-MM-YYYY') : null;
      const endDateString = endDate ? dayjs(endDate).format('DD-MM-YYYY') : null;

      dispatch(setFilterDateRange({ startDate: startDateString, endDate: endDateString }));
      dispatch(fetchDataAndExtractFilters());
    } else {
      console.error('Invalid dates:', dates);
    }
  };

  return (
    <>
      <div className='calendar-range-dropdown'>
        <Space direction="vertical" size={12}>
          <RangePicker
            picker="date"
            value={[startDate ? dayjs(startDate, 'DD-MM-YYYY') : null, endDate ? dayjs(endDate, 'DD-MM-YYYY') : null]}
            onChange={handleDateChange}
          />
        </Space>
      </div>
    </>
  );
};

export default FilterCalendarRange;
