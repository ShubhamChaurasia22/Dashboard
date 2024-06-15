import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Filter from '../filter/Filter';
import './ModelButton.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModelButton () {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="filter_btn">
                <div className="model_btn">
                    <Button onClick={handleOpen}>Filter</Button>
                </div>
            </div>
            <div className='modal-section'>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                    <Box sx={style}>
                        <h3 className='filter-heading'>Table Filter</h3>
                        <Filter />
                    </Box>
                </Modal>
            </div>
        </>
    );
}