import FilterDropdown from "./FilterDropdown";
import FilterMultiDropdown from "./FilterMultiDropdown";
import './Filter.css';
import { clearAllFilters } from '../store/slice/table';
import { useDispatch } from 'react-redux';
import { fetchDataAndExtractFilters } from '../store/slice/table';
import Button from '@mui/material/Button';
import FilterCalendar from "./FilterCalendar";
import FilterCalendarRange from "./FilterCalendarRange";
import ClearIcon from '@mui/icons-material/Clear';

export default function Filter() {
    const dispatch = useDispatch();
    
    const handleClearAllFilters = () => {
      dispatch(clearAllFilters());
      dispatch(fetchDataAndExtractFilters());
    };
    return (
        <>
            <div className="filter-section">
                <div className="single-selected-filter">
                    <div className="single-lable">Single Selected Filters</div>
                    <FilterDropdown />
                </div>
            </div>
            <div className="filter-section">
                <div className="multi-selected-filter">
                    <div className="multi-lable">Multi Selected Filters</div>
                    <FilterMultiDropdown />
                </div>
            </div>

            <div className="filter-section">
                <div className="calendar-range-filter">
                    <div className="multi-lable">Calendar Filters</div>
                    <FilterCalendar />
                </div>
            </div>

            <div className="filter-section">
                <div className="calendar-range-filter">
                    <div className="multi-lable">Calendar Range Filters</div>
                    <FilterCalendarRange />
                </div>
            </div>

            <div className="filter-section btn-clr">
                <div className="clear-btn">
                    {/* <CancelIcon onClick={handleClearAllFilters} /> */}
                    <Button onClick={handleClearAllFilters} variant="outlined">
                        <ClearIcon />
                    </Button>
                </div>
            </div>
        </>
    );
}