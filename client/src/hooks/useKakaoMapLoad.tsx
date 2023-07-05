import { useEffect, useState } from 'react';

const useKakaoMapLoad = () => {
  const [state, setState] = useState({ kakao: {} });
  useEffect(() => {
    const { kakao } = window;
    if (kakao) {
      kakao.maps.load(() => {
        setState({ kakao });
      });
    }
  }, []);

  return state;
};

export default useKakaoMapLoad;
