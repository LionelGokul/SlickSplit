import { useState, useCallback, useRef, useEffect } from 'react';
import { useMaterialTailwindController, setLoader } from '@/context';

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      setLoader(dispatch, true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      const token = localStorage.getItem('token') || '';
      const defaultHeader = token ? { Authorization: `Bearer ${token}` } : {};
      const headerValues = { ...headers, ...defaultHeader };

      try {
        const response = await fetch(`http://localhost:5000/api${url}`, {
          method,
          body,
          headers: headerValues,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // Remove the abort controller from the active list
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          if (
            responseData.message &&
            responseData.message.toLowerCase() === 'authentication failed.'
          ) {
            localStorage.clear(); // Handle authentication failure
          }

          setError(responseData.message || 'Something went wrong!');
          throw new Error(responseData.message || 'Something went wrong!');
        }

        return responseData;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
        setLoader(dispatch, false);
      }
    },
    [dispatch]
  );

  const clearError = () => {
    setError(null);
  };

  // Clean-up function to remove abort controllers
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
