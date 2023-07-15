import { useDispatch } from 'react-redux';

import useMovePage from './useMovePage';

import getLoginStatus from '../utils/getLoginStatus';
import { setUserOAuthActions } from '../store/userAuth-slice';

const useValidEnter = () => {
  const isLogin = getLoginStatus();
  const dispath = useDispatch();
  const goToMain = useMovePage('/');
  const invalidFunc = () => {
    console.log('invalidEnter');
    goToMain();
    dispath(setUserOAuthActions.openLoginModal());
  };
  const validFunc = () => {
    console.log('validenter');
  };

  const result = !isLogin ? invalidFunc : validFunc;
  return result;
};

export default useValidEnter;
