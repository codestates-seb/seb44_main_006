import { useDispatch } from 'react-redux';

import { setUserOAuthActions } from '../store/userAuth-slice';

const useLogoutToggleModal = () => {
  const dispatch = useDispatch();
  const LogoutoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogout());
  };
  return LogoutoggleModal;
};

export default useLogoutToggleModal;
