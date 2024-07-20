import { useCallback, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToken } from '@/service/RmosApi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CustomMenu from './components/CustomMenu';

function App() {
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

  useEffect(() => {
    fetchAndSetBearerToken();
  }, [fetchAndSetBearerToken]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <ToastContainer />
        <CustomMenu />
      </div>
    </LocalizationProvider>
  );
}

export default App;