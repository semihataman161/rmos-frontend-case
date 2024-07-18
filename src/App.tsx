import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToken, getReservation } from '@/service/RmosApi';
import Header from './components/Header';

function App() {
  const [reservation, setReservation] = useState();

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
      console.log(response.value)
      setReservation(response.value);
    } catch (error) {
      console.error('Failed to fetch and set reservation:', error);
    }
  }, []);

  useEffect(() => {
    fetchAndSetBearerToken();
    fetchAndSetReservation();
  }, [fetchAndSetBearerToken, fetchAndSetReservation]);

  return (
    <>
      <div>
        <ToastContainer />
        <Header
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
        />
      </div>
    </>
  );
}

export default App;
