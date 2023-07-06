import { useDispatch } from 'react-redux';

import { overlayActions } from '../store/overlay-slice';

const useToggleModal = () => {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(overlayActions.toggleOverlay());
  };
  return toggleModal;
};

export default useToggleModal;
