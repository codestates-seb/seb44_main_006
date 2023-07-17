import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import useMovePage from './useMovePage';

import getLoginStatus from '../utils/getLoginStatus';
import { setUserOAuthActions } from '../store/userAuth-slice';

const useValidEnter = () => {
  const isLogin = getLoginStatus();
  const dispath = useDispatch();
  const goToMain = useMovePage('/');
  const invalidFunc = useCallback(() => {
    console.log('invalidEnter');
    goToMain();
    dispath(setUserOAuthActions.openLoginModal());
  }, [dispath, goToMain]);
  const validFunc = useCallback(() => {
    console.log('validenter');
  }, []);
  const result = !isLogin ? invalidFunc : validFunc;
  return result;
};

export default useValidEnter;
