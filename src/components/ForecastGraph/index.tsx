import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import GraphInfo from './GraphInfo';
import { formatNumberByPrecision } from '@/utils/number';
import { isEmptyObject } from '@/utils/object';
import StackedBar from '@/components/StackedBar';
import { PERCENTAGE_BAR_HEIGHT_COEFFICIENT } from '@/constants/ForecastGraph';
import { ICategoryData } from '@/types/Forecast';

interface IForecastGraphProps {
    totalReservations: Record<string, any>;
    reservations: any[];
}

const ForecastGraph: React.FC<IForecastGraphProps> = ({ totalReservations, reservations }) => {
    const [allRooms, setAllRooms] = useState<number>(0);
    const [fullRooms, setFullRooms] = useState<number>(0);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalBeds, setTotalBeds] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataByCategory, setDataByCategory] = useState<Record<string, ICategoryData>>({});
    const [xAxisValues, setXAxisValues] = useState<string[]>([]);

    useEffect(() => {
        if (!isEmptyObject(totalReservations)) {
            setAllRooms(totalReservations['Mevcut(Net)']);
            setFullRooms(totalReservations['Net Oda']);
            setTotalPeople(totalReservations['Toplam Kişi']);
            setTotalBeds(totalReservations['Yatak(Mevcut)']);
            setLoading(false);
        }

        if (!isEmptyObject(reservations)) {
            const allRoomsByDate: number[] = reservations.map((element: any) => element['Mevcut(Net)']).slice(0, -1);
            const fullRoomsByDate: number[] = reservations.map((element: any) => element['Net Oda']).slice(0, -1);
            const dates: string[] = reservations.map((element: any) => element['Gun Tarih']).slice(0, -1);
            const availableRoomsByDate: number[] = allRoomsByDate.map((value, index) => value - fullRoomsByDate[index]);
            const percentageOfRooms: number[] = fullRoomsByDate.map((value, index) => (value / allRoomsByDate[index]) * 100 * PERCENTAGE_BAR_HEIGHT_COEFFICIENT);

            const dataByCategory = {
                'Dolu Odalar': { value: fullRoomsByDate, barColor: 'red', barHeightCoefficient: 1 },
                'Boş Odalar': { value: availableRoomsByDate, barColor: 'green', barHeightCoefficient: 1 },
                'Yüzde': { value: percentageOfRooms, barColor: 'gray', barHeightCoefficient: PERCENTAGE_BAR_HEIGHT_COEFFICIENT },
            };

            setDataByCategory(dataByCategory);
            setXAxisValues(dates);
        }
    }, [totalReservations, reservations]);

    const graphInfoData = {
        room: `${fullRooms}/${allRooms} (%${formatNumberByPrecision((fullRooms / allRooms) * 100, 2)})`,
        bed: `${totalPeople}/${totalBeds} (%${formatNumberByPrecision((totalPeople / totalBeds) * 100, 2)})`,
        adult: totalReservations['Yetişkin'] || 0,
        child: totalReservations['Çocuk'] || 0,
        free: totalReservations['Free'] || 0,
        total: totalPeople,
        estimatedIncome: totalReservations['Forecast Gelir'] || 0,
        packageInfo: {
            kdvsiz: totalReservations['Package Kdvsiz'] || 0,
            packagePrice: totalReservations['Package Tutar'] || 0,
            roomPrice: totalReservations['Ort_Oda_Brut'] || 0,
            paxPrice: totalReservations['Ort_Paxp_Brut'] || 0,
        },
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <GraphInfo data={graphInfoData} />
                    <div>
                        <StackedBar dataByCategory={dataByCategory} xAxisValues={xAxisValues} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForecastGraph;