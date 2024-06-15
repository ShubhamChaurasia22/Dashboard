import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAndExtractFilters, setFilter, clearFilter } from '../store/slice/table';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const singleSelectFilters = useSelector(state => state.table.availableFilters.singleSelectFilters);
  const activeFilters = useSelector(state => state.table.activeFilters);

  useEffect(() => {
    dispatch(fetchDataAndExtractFilters());
  }, [dispatch]);

  const handleFilterChange = (filterName, event) => {
    const selectedValue = event.target.value;
    dispatch(setFilter({ property: filterName, value: selectedValue }));
  };

  const handleClearFilter = (filterName) => {
    dispatch(clearFilter(filterName));
  };

  return (
    <div className='single-selected-dropdown'>
      {Object.keys(singleSelectFilters).map(filter => (
        <FormControl key={filter} fullWidth>
          <InputLabel id={`single-filter-dropdown-label-${filter}`}>{filter.replace(/_/g, ' ')}</InputLabel>
          <Select
            labelId={`single-filter-dropdown-label-${filter}`}
            id={`single-filter-dropdown-${filter}`}
            value={activeFilters[filter] || ''}
            onChange={(event) => handleFilterChange(filter, event)}
          >
            {singleSelectFilters[filter].map(value => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {activeFilters[filter] && (
            <Button onClick={() => handleClearFilter(filter)}>Clear Filter</Button>
          )}
        </FormControl>
      ))}
    </div>
  );
};

export default FilterDropdown;
