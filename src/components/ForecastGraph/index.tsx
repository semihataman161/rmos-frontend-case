import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import GraphInfo from "./GraphInfo";
import { formatNumberByPrecision } from "@/utils/number";
import { isEmptyObject } from "@/utils/object";

interface IForecastGraphProps {
    totalReservations: any;
}

const ForecastGraph: React.FC<IForecastGraphProps> = ({ totalReservations }) => {
    const [allRooms, setAllRooms] = useState<number>(0);
    const [availableRooms, setAvailableRooms] = useState<number>(0);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalBeds, setTotalBeds] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isEmptyObject(totalReservations)) {
            setAllRooms(totalReservations["Mevcut(Net)"]);
            setAvailableRooms(totalReservations["Net Oda"]);
            setTotalPeople(totalReservations["Toplam Kişi"]);
            setTotalBeds(totalReservations["Yatak(Mevcut)"]);
            setLoading(false);
        }
    }, [totalReservations]);

    const data = {
        room: `${availableRooms}/${allRooms} (%${formatNumberByPrecision((availableRooms / allRooms) * 100, 2)})`,
        bed: `${totalPeople}/${totalBeds} (%${formatNumberByPrecision((totalPeople / totalBeds) * 100, 2)})`,
        adult: totalReservations["Yetişkin"] || 0,
        child: totalReservations["Çocuk"] || 0,
        free: totalReservations["Free"] || 0,
        total: totalPeople,
        estimatedIncome: totalReservations["Forecast Gelir"] || 0,
        packageInfo: {
            kdvsiz: totalReservations["Package Kdvsiz"] || 0,
            packagePrice: totalReservations["Package Tutar"] || 0,
            roomPrice: totalReservations["Ort_Oda_Brut"] || 0,
            paxPrice: totalReservations["Ort_Paxp_Brut"] || 0,
        },
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <GraphInfo data={data} />
            )}
        </div>
    );
};

export default ForecastGraph;