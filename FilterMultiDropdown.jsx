import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAndExtractFilters, setFilter, clearFilter } from '../store/slice/table';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

const FilterMultiDropdown = () => {
  const dispatch = useDispatch();
  const multiSelectFilters = useSelector(state => state.table.availableFilters.multiSelectFilters);
  const activeFilters = useSelector(state => state.table.activeFilters);

  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  useEffect(() => {
    dispatch(fetchDataAndExtractFilters());
  }, [dispatch]);

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const handleFilterChange = (filterName, event) => {
    const selectedValues = event.target.value;
    setSelectedFilters(prevSelectedFilters => ({
      ...prevSelectedFilters,
      [filterName]: selectedValues
    }));

    // Clear the previous timeout
    clearTimeout(handleFilterChange.timeout);

    // Set a new timeout to dispatch the filter change
    handleFilterChange.timeout = setTimeout(() => {
      dispatch(setFilter({ property: filterName, value: selectedValues }));
    }, 3000); // Adjust debounce delay as needed
  };

  const handleClearFilter = (filterName) => {
    setSelectedFilters(prevSelectedFilters => ({
      ...prevSelectedFilters,
      [filterName]: []
    }));
    dispatch(clearFilter(filterName));
  };

  return (
    <div className='multi-selected-dropdown'>
      {Object.keys(multiSelectFilters).map(filter => (
        <FormControl key={filter} fullWidth margin="normal">
          <InputLabel id={`multi-filter-dropdown-label-${filter}`}>{filter.replace(/_/g, ' ')}</InputLabel>
          <Select
            labelId={`multi-filter-dropdown-label-${filter}`}
            id={`multi-filter-dropdown-${filter}`}
            multiple
            value={selectedFilters[filter] || []}
            onChange={(event) => handleFilterChange(filter, event)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {multiSelectFilters[filter].map(value => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {selectedFilters[filter] && selectedFilters[filter].length > 0 && (
            <Button onClick={() => handleClearFilter(filter)}>Clear Filter</Button>
          )}
        </FormControl>
      ))}
    </div>
  );
};

export default FilterMultiDropdown;
