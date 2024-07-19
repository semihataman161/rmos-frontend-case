import * as React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrintIcon from '@mui/icons-material/Print';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Footer: React.FC = () => {
    const [orientation, setOrientation] = React.useState('YATAY');
    const [paperSize, setPaperSize] = React.useState('A4');

    const handleOrientationChange = (event: SelectChangeEvent<string>) => {
        setOrientation(event.target.value as string);
    };

    const handlePaperSizeChange = (event: SelectChangeEvent<string>) => {
        setPaperSize(event.target.value as string);
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
                    <AutorenewIcon sx={{ marginRight: '10px' }} />
                    Yenile
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <PrintIcon sx={{ marginRight: '10px' }} />
                    Print
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <DocumentScannerIcon sx={{ marginRight: '10px' }} />
                    Excel
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Select
                    value={orientation}
                    onChange={handleOrientationChange}
                    sx={{
                        marginRight: '10px',
                        height: '32px',
                        '.MuiSelect-select': {
                            padding: '4px 10px',
                            fontSize: '14px',
                        },
                    }}
                >
                    <MenuItem value="YATAY">YATAY</MenuItem>
                    <MenuItem value="DIKEY">DIKEY</MenuItem>
                </Select>
                <Select
                    value={paperSize}
                    onChange={handlePaperSizeChange}
                    sx={{
                        marginRight: '10px',
                        height: '32px',
                        '.MuiSelect-select': {
                            padding: '4px 10px',
                            fontSize: '14px',
                        },
                    }}
                >
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="A3">A3</MenuItem>
                    <MenuItem value="A5">A5</MenuItem>
                </Select>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <DesignServicesIcon sx={{ marginRight: '10px' }} />
                    Dizayn
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <CancelPresentationIcon />
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <SaveIcon />
                </Button>
                <Button variant="contained" sx={{ marginRight: '10px' }}>
                    <LiveHelpIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default Footer;