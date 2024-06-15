import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAndExtractFilters, selectFilteredData } from '../store/slice/table';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Status() {
    const [snackbarContent, setSnackbarContent] = useState({ message: '', severity: 'info' });
    const [open, setOpen] = useState(false); // Manage the open state
    const dispatch = useDispatch();
    const filteredData = useSelector(selectFilteredData);
    const isLoading = useSelector(state => state.table.isLoading);
    const error = useSelector(state => state.table.error);

    useEffect(() => {
        dispatch(fetchDataAndExtractFilters())
            .then(() => {
                setSnackbarContent({ message: 'Data loaded successfully!', severity: 'success' });
                setOpen(true); // Open Snackbar when data is fetched
            })
            .catch(() => {
                setSnackbarContent({ message: 'Error fetching data.', severity: 'error' });
                setOpen(true); // Open Snackbar when error occurs
            });
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setSnackbarContent({ message: 'Error: ' + error, severity: 'error' });
            setOpen(true); // Open Snackbar when error occurs
        }
    }, [error]);

    useEffect(() => {
        if (!isLoading && filteredData.length === 0) {
            setSnackbarContent({ message: 'No data available', severity: 'warning' });
            setOpen(true); // Open Snackbar when no data available
        }
    }, [isLoading, filteredData]);

    const handleCloseSnackbar = () => {
        setOpen(false); // Close Snackbar
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarContent.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarContent.message}
                </Alert>
            </Snackbar>
        </>
    );
}
