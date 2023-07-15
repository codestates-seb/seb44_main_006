import { useDispatch } from 'react-redux';

import { setUserOAuthActions } from '../store/userAuth-slice';

const useLoginToggleModal = () => {
  const dispatch = useDispatch();
  const LogintoggleModal = () => {
    dispatch(setUserOAuthActions.toggleIsLogin());
  };
  return LogintoggleModal;
};

export default useLoginToggleModal;
