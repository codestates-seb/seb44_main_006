import { useNavigate } from 'react-router-dom';

const useMovePage = (url: string, value?: string | number | null) => {
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate(url, { state: value });
  };
  return navigatePage;
};

export default useMovePage;
