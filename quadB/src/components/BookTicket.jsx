import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';

function BookTicket({ showName }) {
    const [openForm, setOpenForm] = useState(false);
    const [name, setName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = () => {
        console.log(`Name: ${name}, Date: ${selectedDate}`);
        handleCloseForm();
    };

    return (
        <div className='grid place-items-center mt-4'>
            <Button variant="contained" onClick={handleOpenForm}>
                Book Ticket of  {showName}
            </Button>

            <Dialog open={openForm} onClose={handleCloseForm}>
                <DialogTitle>Book Movie Ticket</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                            margin="normal"
                        />
                        <TextField
                            label="Select Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={selectedDate}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                    <Button onClick={handleSubmit}>Book</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BookTicket;
