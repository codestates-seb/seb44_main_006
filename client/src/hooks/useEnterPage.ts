import { useEffect } from 'react';

import useValidEnter from './useValidEnter';

import scrollToTop from '../utils/scrollToTop';

const useEnterPage = () => {
  const checkValidEnter = useValidEnter();
  useEffect(() => {
    checkValidEnter();
    scrollToTop();
  }, [checkValidEnter]);
};

export default useEnterPage;
