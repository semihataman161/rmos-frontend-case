import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToken, getReservation } from '@/service/RmosApi';
import Header from './components/Header';
import Table from './components/Table';
import { formatDate, getDayName } from './utils/dates';
import { formatNumberByPrecision } from './utils/numbers';

function App() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetBearerToken = useCallback(async () => {
    try {
      const request = {
        userName: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD
      };

      const response = await createToken(request);
      localStorage.setItem('authToken', response);
    } catch (error) {
      console.error('Failed to fetch and set token:', error);
    }
  }, []);

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
    fetchAndSetBearerToken();
    fetchAndSetReservation();
  }, [fetchAndSetBearerToken, fetchAndSetReservation]);

  const tableHeaders = [
    {
      field: "Tarih",
      headerName: 'Tarih',
      valueGetter: (value: any, row: any) => formatDate(value)
    },
    { field: "Mevcut", headerName: 'Mevcut' },
    { field: "Oda", headerName: 'Oda' },
    { field: "Yetişkin", headerName: 'Yetişkin' },
    { field: "Çocuk", headerName: 'Çocuk' },
    { field: "Free", headerName: 'Free' },
    { field: "Toplam Kişi", headerName: 'Top.Kisi' },
    { field: "Pax(P)", headerName: 'Pax' },
    {
      field: "Yuzde%(Net)",
      headerName: 'Net %',
      valueGetter: (value: any, row: any) => `%${formatNumberByPrecision(value * 100, 3)}`
    },
    { field: "Son Durum", headerName: 'Son durum' },
    {
      field: "Package Tutar",
      headerName: 'Package',
      valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2)
    },
    { field: "Gun Tarih", headerName: 'Gun Tarih' },
    {
      field: "Gün İsmi",
      headerName: 'Gün İsmi',
      valueGetter: (value: any, row: any) => getDayName(row["Gun Tarih"])
    },
    {
      field: "Pax(Y/C2)",
      headerName: 'Pax(Y+C/2)',
      valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2)
    },
  ];

  return (
    <>
      <div>
        <ToastContainer />
        {/* <Header
          ayKodu="abc123xyz"
          baslangicTarihi="2024-01-01"
          bitisTarihi="2024-12-31"
          sistemTarihi="2024-07-18"
          alisTarihi="2024-07-15"
          konumSecenek="locationOptionA"
          dovizSeciniz="currencySelectXYZ"
          yuzdeCik="percentageOut123"
          type="typeABC"
          grafikteCikacaklar="chartItemsXYZ"
          kalanlar="remainingItems"
          connKontenjan="quotaAvailable"
          fiiltreler="filtersXYZ"
          otelDep="hotelDepot123"
          occForecast="forecastABC"
          sirketSecimi="companySelection"
          rap="reportXYZ"
        /> */}
        <Table data={reservations} headers={tableHeaders} loading={loading} />
      </div>
    </>
  );
}

export default App;
