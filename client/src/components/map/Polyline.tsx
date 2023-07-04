import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';

const Polyline = ({ linePos }: { linePos: { lat: number; lng: number }[] }) => {
  const map = useSelector((state) => state.map.map);

  useEffect(() => {
    const linePath = linePos.map(
      (pos: { lat: number; lng: number }) =>
        new kakao.maps.LatLng(pos.lat, pos.lng)
    );
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 2,
      strokeColor: cssToken.COLOR['point-900'],
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });
    polyline.setMap(map);

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [map, linePos]);

  return null;
};

export default Polyline;
