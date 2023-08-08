import { useNavigate } from 'react-router-dom';

const useMovePage = (
  url: string,
  value?: string | number | null,
  replace = false
) => {
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate(url, { replace, state: value });
  };
  return navigatePage;
};

export default useMovePage;
