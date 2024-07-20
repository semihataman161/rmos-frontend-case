import * as React from 'react';
import PrintIcon from '@mui/icons-material/Print';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Box, Button, TextField } from '@mui/material';

const BlackListFooter: React.FC = () => {
    const [inputValue, setInputValue] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <PrintIcon sx={{ marginRight: '10px' }} />
                    Print
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <DocumentScannerIcon sx={{ marginRight: '10px' }} />
                    XML
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    label="Ara"
                    size="small"
                    value={inputValue}
                    onChange={handleChange}
                    sx={{ marginBottom: '10px' }}
                    type='number'
                />
            </Box>
        </Box>
    );
};

export default BlackListFooter;