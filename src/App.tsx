import { useCallback, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToken } from '@/service/RmosApi';
import { setBearerToken } from '@/service/Api';

function App() {

  const fetchAndSetBearerToken = useCallback(async () => {
    try {
      const credentials = {
        userName: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD
      };

      const response = await createToken(credentials);
      console.log(response);

      // setBearerToken(token);
    } catch (error) {
      console.error('Failed to fetch and set token:', error);
    }
  }, []);

  useEffect(() => {
    fetchAndSetBearerToken();
  }, [fetchAndSetBearerToken]);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
