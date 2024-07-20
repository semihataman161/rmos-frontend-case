import { useState, useEffect, useCallback } from 'react';
import ForecastHeader from '@/components/ForecastHeader';
import Table from '@/components/Table';
import CustomTab from '@/components/CustomTab';
import ForecastFooter from '@/components/ForecastFooter';
import { sections } from '@/constants/ForecastHeader';
import { forecastTableHeaders } from '@/constants/Table';
import { getReservation } from '@/service/RmosApi';

const ForecastOperations: React.FC = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAndSetReservation = useCallback(async () => {
        try {
            const request = {
                db_Id: 9,
                xRez_Sirket: 9,
                xBas_Tar: "2024-06-01",
                xBit_Tar: "2024-06-10",
                xtip: 1,
                kon1: "ALL",
                kon2: "BB",
                xchkFis_Fazla_otel_10: 0,
                bas_Yil: 2022,
                bit_Yil: 2022,
                fisrci_Kapalioda_10: 0,
                xRez_C_W: "C",
                xSistem_Tarihi: "2024-01-01",
                xAlis_Tarihi: "2024-01-01",
                sistem_Bas1: "2020-01-01",
                sistem_Bit1: "2029-01-01",
                pmdahil_10: 0,
                tip_1: "001",
                xFis_Bela_tutar_10: 0,
                trace_Dus_10: 0,
                cev_01: null
            };

            const response = await getReservation(request);
            const arrangedReservations = response.value.map((element: any, index: number) => ({ id: index, ...element }));

            const aggregatedValues = arrangedReservations.reduce((accumulator: any, currentObject: any) => {
                for (const [key, value] of Object.entries(currentObject)) {
                    if (typeof value === 'number') {
                        accumulator[key] = (accumulator[key] || 0) + value;
                    } else if (typeof value === 'string') {
                        accumulator[key] = (accumulator[key] || '') + value;
                    }

                    if (key === 'Tarih') {
                        accumulator[key] = "30";
                    } else if (['Gun Tarih', 'Gün İsmi'].includes(key)) {
                        accumulator[key] = "";
                    }
                }
                return accumulator;
            }, {});

            setReservations([...arrangedReservations, aggregatedValues]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch and set reservation:', error);
        }
    }, []);

    useEffect(() => {
        fetchAndSetReservation();
    }, [fetchAndSetReservation]);

    const tabContent = {
        "Mevcut Forecast": <>NOT IPLEMENTED YET</>,
        "Acenta Forecast": <>NOT IPLEMENTED YET</>,
        "StopSale Forecast": <>NOT IPLEMENTED YET</>,
        "Forecast Grafiği": <></>,
        "Tarih Forecast": <Table data={reservations} headers={forecastTableHeaders} loading={loading} isAggregationAllowed={true} />,
        "Detay Forecast": <>NOT IPLEMENTED YET</>,
        "Waiting Forecast": <>NOT IPLEMENTED YET</>,
        "Konum Forecast": <>NOT IPLEMENTED YET</>,
        "Mevcut Karşılaştır": <>NOT IPLEMENTED YET</>,
        "Occupancy General Forecast(2)": <>NOT IPLEMENTED YET</>
    };

    return (
        <>
            <ForecastHeader sections={sections} />
            <div style={{ marginTop: '30px' }}>
                <CustomTab tabContent={tabContent} initialSelectedTab="Forecast Grafiği" />
            </div>
            <ForecastFooter />
        </>
    );
};

export default ForecastOperations;