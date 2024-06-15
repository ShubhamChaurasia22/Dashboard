import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// Define thunk for fetching data and extracting filter options
export const fetchDataAndExtractFilters = createAsyncThunk('table/fetchDataAndExtractFilters', async () => {
  const response = await fetch('http://localhost:3001/api/data');
  const data = await response.json();

  // Extract unique values for filters
  const extractUniqueValues = (key) => [...new Set(data.map(item => item[key]))];

  const singleSelectFilters = {
    County: extractUniqueValues('County'),
    City: extractUniqueValues('City'),
    Postal_Code: extractUniqueValues('Postal_Code'),
  };

  const multiSelectFilters = {
    Make: extractUniqueValues('Make'),
    Model: extractUniqueValues('Model'),
    Electric_Range: extractUniqueValues('Electric_Range'),
  };

  return { data, singleSelectFilters, multiSelectFilters };
});

// Function to filter data and update available filter options
const filterData = (data, activeFilters, selectedDate, startDate, endDate) => {
  let filtered = data;

  // Apply active filters
  Object.keys(activeFilters).forEach(filter => {
    if (Array.isArray(activeFilters[filter])) {
      filtered = filtered.filter(item => activeFilters[filter].includes(item[filter]));
    } else {
      filtered = filtered.filter(item => item[filter] === activeFilters[filter]);
    }
  });

  // Apply selected date filter
  if (selectedDate) {
    const selectedDateStr = dayjs(selectedDate).format('DD-MM-YYYY');
    filtered = filtered.filter(item => item.Model_Year === selectedDateStr);
  }

  // Apply date range filter
  if (startDate && endDate) {
    const startStr = dayjs(startDate).format('DD-MM-YYYY');
    const endStr = dayjs(endDate).format('DD-MM-YYYY');
    filtered = filtered.filter(item => {
      const modelYear = dayjs(item.Model_Year, 'DD-MM-YYYY');
      return modelYear.isBetween(startStr, endStr, null, '[]');
    });
  }

  return filtered;
};

// Function to update available filter options based on filtered data
const updateAvailableFilters = (data) => {
  const extractUniqueValues = (key) => [...new Set(data.map(item => item[key]))];

  return {
    singleSelectFilters: {
      City: extractUniqueValues('City'),
      County: extractUniqueValues('County'),
      Postal_Code: extractUniqueValues('Postal_Code'),
    },
    multiSelectFilters: {
      Make: extractUniqueValues('Make'),
      Model: extractUniqueValues('Model'),
      Electric_Range: extractUniqueValues('Electric_Range'),
    }
  };
};

// Define table slice
const tableSlice = createSlice({
  name: 'table',
  initialState: {
    isLoading: false,
    data: [],
    filteredData: [],
    error: null,
    singleSelectFilters: {},
    multiSelectFilters: {},
    availableFilters: { singleSelectFilters: {}, multiSelectFilters: {} },
    activeFilters: {},
    selectedDate: null,
    startDate: null,
    endDate: null,
  },
  reducers: {
    setFilter: (state, action) => {
      const { property, value } = action.payload;
      const isSingleSelectFilter = Object.keys(state.singleSelectFilters).includes(property);

      // Update active filters
      if (isSingleSelectFilter) {
        state.activeFilters[property] = value;
      } else {
        state.activeFilters[property] = value.length > 0 ? value : null;
      }

      state.filteredData = filterData(state.data, state.activeFilters, state.selectedDate, state.startDate, state.endDate);
      state.availableFilters = updateAvailableFilters(state.filteredData);
    },
    clearFilter: (state, action) => {
      const property = action.payload;
      delete state.activeFilters[property];
      state.filteredData = filterData(state.data, state.activeFilters, state.selectedDate, state.startDate, state.endDate);
      state.availableFilters = updateAvailableFilters(state.filteredData);
    },
    clearAllFilters: (state) => {
      state.activeFilters = {};
      state.filteredData = state.data;
      state.availableFilters = updateAvailableFilters(state.data);
      state.startDate = null;
      state.endDate = null;
      state.selectedDate = null;
    },
    setDateFilter: (state, action) => {
      state.selectedDate = action.payload;
      state.filteredData = filterData(state.data, state.activeFilters, action.payload, state.startDate, state.endDate);
      state.availableFilters = updateAvailableFilters(state.filteredData);
    },
    clearDateFilter: (state) => {
      state.selectedDate = null;
      state.filteredData = filterData(state.data, state.activeFilters, null, state.startDate, state.endDate);
      state.availableFilters = updateAvailableFilters(state.filteredData);
    },
    setFilterDateRange: (state, action) => {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
      state.filteredData = filterData(state.data, state.activeFilters, state.selectedDate, startDate, endDate);
      state.availableFilters = updateAvailableFilters(state.filteredData);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAndExtractFilters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataAndExtractFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.singleSelectFilters = action.payload.singleSelectFilters;
        state.multiSelectFilters = action.payload.multiSelectFilters;
        state.filteredData = action.payload.data;
        state.availableFilters = {
          singleSelectFilters: action.payload.singleSelectFilters,
          multiSelectFilters: action.payload.multiSelectFilters
        };
      })
      .addCase(fetchDataAndExtractFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter, clearAllFilters, setDateFilter, clearDateFilter, setFilterDateRange } = tableSlice.actions;

// Selector function to get the filtered data
export const selectFilteredData = (state) => state.table.filteredData;
export const selectDateRange = (state) => ({ startDate: state.table.startDate, endDate: state.table.endDate });
export const selectDateFilter = (state) => state.table.selectedDate;
export const selectAvailableFilters = (state) => state.table.availableFilters;

export default tableSlice.reducer;
