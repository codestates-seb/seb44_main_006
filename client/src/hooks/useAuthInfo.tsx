import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import useMovePage from './useMovePage';

const useAuthentication = () => {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('isLogin', JSON.stringify(true));
      gotoMain();

      axios
        .get(`${PROXY}/auth/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // AccessToken
            RefreshToken: `${accessToken}`, // RefreshToken
          },
        })
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          gotoMain();
        })
        .catch((err) => {
          // const errStatus: number = err.response.status || 500;
          // return navigate(`/error/${errStatus}`);
        });
    }
  }, [PROXY, accessToken, gotoMain]);
};

export default useAuthentication;
