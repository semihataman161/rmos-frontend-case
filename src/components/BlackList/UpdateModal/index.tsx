import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (updatedData: any) => void;
    initialData: any;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ open, onClose, onConfirm, initialData }) => {
    const [data, setData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Item</DialogTitle>
            <DialogContent>
                <TextField
                    name="name"
                    label="Name"
                    value={data.name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                {/* Add more fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        onConfirm(data);
                        onClose();
                    }}
                    color="primary"
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateModal;