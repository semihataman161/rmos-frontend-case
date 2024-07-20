import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getCurrentDateTime } from '@/utils/date';

interface IGraphInfoProps {
    data: {
        room: string;
        bed: string;
        adult: number;
        child: number;
        free: number;
        total: number;
        estimatedIncome: number;
        packageInfo: {
            kdvsiz: number;
            packagePrice: number;
            roomPrice: number;
            paxPrice: number;
        };
    };
}

const GraphInfo: React.FC<IGraphInfoProps> = ({ data }) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>(getCurrentDateTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Rmos Victory Be mine {currentDateTime}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={4}>
                    <Typography variant="h6" color="error">
                        Room: {data.room}
                    </Typography>
                    <Typography variant="h6" color="error">
                        Bed: {data.bed}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    [ Yetişkin:{data.adult} Cocuk:{data.child} Free:{data.free} Toplam:{data.total} Yet+Chd/2:{data.total},0 Pax(P):{data.total},00 ]
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={1}>
                    <Typography variant="h6" color="green">
                        Tahmini Gelir: {data.estimatedIncome}
                    </Typography>
                    <Typography variant="h6" color="green">
                        Ort.Oda:{data.packageInfo.roomPrice}
                    </Typography>
                    <Typography variant="h6" color="green">
                        Ort.Pax(Chd/2):{data.packageInfo.paxPrice}
                    </Typography>
                    <Typography variant="h6" color="green">
                        Ort.Pax (P):{data.packageInfo.paxPrice}
                    </Typography>
                    <Typography variant="h6" color="green">
                        Package(Gerçekleşen): {data.packageInfo.packagePrice}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                    <Typography variant="h6" color="error">
                        Kdvsiz [ Package:{data.packageInfo.kdvsiz}
                    </Typography>
                    <Typography variant="h6" color="error">
                        Ort.Oda:{data.packageInfo.roomPrice}
                    </Typography>
                    <Typography variant="h6" color="error">
                        Ort.Pax(Chd/2):{data.packageInfo.paxPrice}
                    </Typography>
                    <Typography variant="h6" color="error">
                        Ort.Pax(Yet+Coc):{data.packageInfo.paxPrice}
                    </Typography>
                    <Typography variant="h6" color="error">
                        Ort.Pax (P):{data.packageInfo.paxPrice} ]
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default GraphInfo;