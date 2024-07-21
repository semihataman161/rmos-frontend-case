import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomMenu from './components/CustomMenu';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ToastContainer />
      <div>
        {authToken ? (
          <div style={{ flex: 1, minHeight: '100vh', paddingBottom: '80px' }}>
            <CustomMenu />
          </div>
        ) : (
          <Login />
        )}
      </div>
      <Footer />
    </LocalizationProvider>
  );
}

export default App;