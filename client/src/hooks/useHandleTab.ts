import { useState } from 'react';

const useHandleTab = () => {
  const [selectTab, setSelectTab] = useState<'Newest' | 'Like'>('Newest');
  const setTab = (tab: 'Newest' | 'Like') => {
    setSelectTab(tab);
  };
  return { selectTab, setTab };
};

export default useHandleTab;
