import { useEffect, useState } from "react";
import GraphInfo from "./GraphInfo";
import { formatNumberByPrecision } from "@/utils/number";

interface IForecastGraphProps {
    totalReservations: any;
}

function isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
}

const ForecastGraph: React.FC<IForecastGraphProps> = ({ totalReservations }) => {
    const [allRooms, setAllRooms] = useState<number>(0);
    const [availableRooms, setAvailableRooms] = useState<number>(0);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalBeds, setTotalBeds] = useState<number>(0);
    const [totalAdults, setTotalAdults] = useState<number>(0);
    const [totalChildren, setTotalChildren] = useState<number>(0);
    const [totalFree, setTotalFree] = useState<number>(0);


    useEffect(() => {
        if (!isEmptyObject(totalReservations)) {
            setAllRooms(totalReservations["Mevcut(Net)"]);
            setAvailableRooms(totalReservations["Net Oda"]);
            setTotalPeople(totalReservations["Toplam Kişi"]);
            setTotalBeds(totalReservations["Yatak(Mevcut)"]);
            setTotalAdults(totalReservations["Yetişkin"]);
            setTotalChildren(totalReservations["Çocuk"]);
            setTotalFree(totalReservations["Free"]);
        }
    }, [totalReservations]);

    const data = {
        room: `${availableRooms}/${allRooms} (%${formatNumberByPrecision((availableRooms / allRooms) * 100, 2)})`,
        bed: `${totalPeople}/${totalBeds} (%${formatNumberByPrecision((totalPeople / totalBeds) * 100, 2)})`,
        adult: totalAdults,
        child: totalChildren,
        free: totalFree,
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
        <GraphInfo data={data} />
    );
};

export default ForecastGraph;