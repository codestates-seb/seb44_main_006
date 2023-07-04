import { useNavigate } from 'react-router-dom';

const useMovePage = (url: string) => {
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate(url);
  };
  return navigatePage;
};

export default useMovePage;
