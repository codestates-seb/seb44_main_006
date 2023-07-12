import { useCallback, useState } from 'react';

const useHandleTab = () => {
  const [selectTab, setSelectTab] = useState<'Newest' | 'Like'>('Newest');
  const setTab = useCallback((tab: 'Newest' | 'Like') => {
    setSelectTab(tab);
  }, []);
  return { selectTab, setTab };
};

export default useHandleTab;
