import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import useMovePage from './useMovePage';

import {
  toggleIsLogin,
  setAccessToken,
  setUserInfo,
} from '../store/isLogin-slice';
import { RootState } from '../store';


const useAuthentication = () => {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const [searchParams] = useSearchParams();
  const userInfoData = useSelector((state: RootState) => state.isLogin);
  const accessToken = searchParams.get('access_token');
  const navigate = useNavigate();
  const gotoMain = useMovePage('/');
  const dispatch = useDispatch();

  const userIsLogin: string = localStorage.getItem('isLogin');

  if (accessToken) {
    dispatch(toggleIsLogin(JSON.parse(userIsLogin)));
  }

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('isLogin', JSON.stringify(true));

      axios
        .get(`${PROXY}/auth/members`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // AccessToken
            RefreshToken: `${accessToken}`, // RefreshToken
          },
        })
        .then((res) => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          return gotoMain();
        })
        .catch((err) => {
          const errStatus: number = err.response.status;
          return navigate(`/error/${errStatus}`);
        });
    }
  }, [PROXY, accessToken, dispatch, gotoMain, navigate]);
};

export default useAuthentication;
