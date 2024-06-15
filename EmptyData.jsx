import './EmptyData.css';
import EMPTY_IMG from '../assets/empty-page.png'
import { useDispatch } from 'react-redux';
import { fetchDataAndExtractFilters } from '../store/slice/table';
import Button from '@mui/material/Button';
import { clearAllFilters } from '../store/slice/table';

export default function EmptyData () {
    const dispatch = useDispatch();

    const handleClearAllFilters = () => {
      dispatch(clearAllFilters());
      dispatch(fetchDataAndExtractFilters());
    };
    return (
        <>
            <div className="empty-state">
                <div className="empty-state__content">
                    <div className="empty-state__icon">
                        <img src={EMPTY_IMG} alt="empty page" />
                    </div>
                    <div className="empty-state__message">No records has available.</div>
                    <div className="clear-btn">
                        <Button onClick={handleClearAllFilters} variant="outlined">Back</Button>
                    </div>
                </div>
            </div>
        </>
    );
}