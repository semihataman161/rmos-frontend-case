import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { IBlackListAddOrUpdateForm } from '@/types/BlackList';

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (updatedData: IBlackListAddOrUpdateForm) => void;
    data: IBlackListAddOrUpdateForm;
}

const BlackListAddOrUpdateModal: React.FC<UpdateModalProps> = ({ open, onClose, onConfirm, data }) => {
    const [formData, setFormData] = useState<IBlackListAddOrUpdateForm>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {
                    data.Id === 0 ?
                        "Yeni Kayıt Ekle" :
                        "Kaydı Güncelle"
                }
            </DialogTitle>
            <DialogContent>
                <TextField
                    name="Adi"
                    label="Adı"
                    value={formData.Adi || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Soy"
                    label="Soyadı"
                    value={formData.Soy || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Tcno"
                    label="TCKN"
                    value={formData.Tcno || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Kimlik_no"
                    label="Kimlik No"
                    value={formData.Kimlik_no || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Dogum_tarihi"
                    label="Doğum Tarihi"
                    value={formData.Dogum_tarihi || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Sistem_tarihi"
                    label="Sistem Tarihi"
                    value={formData.Sistem_tarihi || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Aciklama"
                    label="Açıklama"
                    value={formData.Aciklama || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Sistem_grubu"
                    label="Grubu"
                    value={formData.Sistem_grubu || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Ulke_xml"
                    label="Milliyet"
                    value={formData.Ulke_xml || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    name="Kulanici"
                    label="Kullanıcı"
                    value={formData.Kulanici || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button
                    onClick={() => {
                        onConfirm(formData);
                        onClose();
                    }}
                    color="primary"
                >
                    {
                        data.Id === 0 ?
                            "Ekle" :
                            "Güncelle"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BlackListAddOrUpdateModal;