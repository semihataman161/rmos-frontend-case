import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToken, getReservation } from '@/service/RmosApi';
import Header from './components/Header';
import Table from './components/Table';
import { formatDate, getDayName } from './utils/dates';
import { formatNumberByPrecision } from './utils/numbers';
import CustomTab from './components/CustomTab';
import Footer from './components/Footer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ISectionConfig } from './types/Header';
import { SelectChangeEvent } from '@mui/material';

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
      sortable: false,
      valueGetter: (value: any, row: any) => `%${formatNumberByPrecision(value * 100, 3)}`,
    },
    { field: "Son Durum", headerName: 'Son durum' },
    {
      field: "Package Tutar",
      headerName: 'Package',
      sortable: false,
      valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2),
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
      sortable: false,
      valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2),
    },
  ];

  const tabContent = {
    "Mevcut Forecast": <>NOT IPLEMENTED YET</>,
    "Acenta Forecast": <>NOT IPLEMENTED YET</>,
    "StopSale Forecast": <>NOT IPLEMENTED YET</>,
    "Forecast Grafiği": <></>,
    "Tarih Forecast": <Table data={reservations} headers={tableHeaders} loading={loading} />,
    "Detay Forecast": <>NOT IPLEMENTED YET</>,
    "Waiting Forecast": <>NOT IPLEMENTED YET</>,
    "Konum Forecast": <>NOT IPLEMENTED YET</>,
    "Mevcut Karşılaştır": <>NOT IPLEMENTED YET</>,
    "Occupancy General Forecast(2)": <>NOT IPLEMENTED YET</>
  };

  const sections: ISectionConfig[] = [
    {
      elements: [
        {
          label: 'Ay Kodu',
          value: 'Haziran',
          type: 'select',
          options: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
          onChange: (event: SelectChangeEvent<any>) => {
            console.log('Ay Kodu changed to:', event.target.value);
          },
        },
        {
          label: 'Başlangıç Tarihi',
          value: '2024-06-01',
          type: 'date',
          onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
            console.log('Başlangıç Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
          },
        },
        {
          label: 'Bitiş Tarihi',
          value: '2024-06-30',
          type: 'date',
          onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
            console.log('Bitiş Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
          },
        },
        {
          label: 'Sistem Tarihi',
          value: '2024-07-06',
          type: 'date',
          onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
            console.log('Sistem Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
          },
        },
        {
          label: 'Alış Tarihi',
          value: '2024-07-06',
          type: 'date',
          onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
            console.log('Alış Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
          },
        },
      ],
    },
    {
      elements: [
        {
          label: 'Oda Tipi',
          value: '',
          type: 'select',
          options: [],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('Oda Tipi changed to:', event.target.value);
          },
        },
        {
          label: 'Acenta',
          value: '',
          type: 'select',
          options: [],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('Acenta changed to:', event.target.value);
          },
        },
        {
          label: 'For.Grubu',
          value: '',
          type: 'select',
          options: [],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('For.Grubu changed to:', event.target.value);
          },
        },
        {
          label: 'Pazar',
          value: '',
          type: 'select',
          options: [],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('Pazar changed to:', event.target.value);
          },
        },
        {
          label: 'Acenta.Grup',
          value: '',
          type: 'select',
          options: [],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('Acenta.Grup changed to:', event.target.value);
          },
        },
      ],
    },
    {
      elements: [
        {
          label: 'Konum Seçenek',
          value: 'Verilen Konum',
          type: 'radio',
          options: ['Verilen Konum', 'İstenen Konum'],
          onChange: (event) => {
            // console.log('Verilen Konum changed to:', event.target.value);
          },
        },
        {
          label: 'Döviz Seçiniz',
          value: 'EURO',
          type: 'select',
          options: ["EURO", "DOLAR", "TL"],
          onChange: (event: SelectChangeEvent<any>) => {
            // console.log('Döviz Seçiniz changed to:', event.target.value);
          },
        },
      ],
    },
    {
      elements: [
        {
          label: 'Type',
          value: 'Confirmed',
          type: 'radio',
          options: ['Confirmed', 'Tentative', 'All'],
          onChange: (event) => {
            // console.log('Type changed to:', event.target.value);
          },
        },
      ],
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <ToastContainer />
        <Header
          sections={sections}
        />
        <CustomTab tabContent={tabContent} initialSelectedTab="Forecast Grafiği" />
        <Footer />
      </div>
    </LocalizationProvider>
  );
}

export default App;