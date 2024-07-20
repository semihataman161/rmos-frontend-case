import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Silme Onayı</DialogTitle>
            <DialogContent>Bu öğeyi silmek istediğinizden emin misiniz?</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={onConfirm} color="primary">Sil</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;