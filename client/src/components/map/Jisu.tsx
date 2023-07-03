import { useEffect } from 'react';

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const container = document.getElementById('map')!;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);
  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
