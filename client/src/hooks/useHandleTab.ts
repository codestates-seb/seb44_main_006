import { useCallback, useState } from 'react';

const useHandleTab = () => {
  const [selectTab, setSelectTab] = useState<'First' | 'Second'>('First');
  const setTab = useCallback((tab: 'First' | 'Second') => {
    setSelectTab(tab);
  }, []);
  return { selectTab, setTab };
};

export default useHandleTab;
