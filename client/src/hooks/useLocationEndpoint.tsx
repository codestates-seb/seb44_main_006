import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useLocationEndpoint = () => {
  const [ispath, setIsPath] = useState<string>('');
  const location = useLocation();
  const endpoint: string = location.pathname.split('/')[1];

  useEffect(() => {
    setIsPath(endpoint);
  }, [endpoint]);

  return ispath;
};

export default useLocationEndpoint;
