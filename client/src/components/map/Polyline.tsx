import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cssToken from '../../styles/cssToken';
import { RootState } from '../../store';

const Polyline = ({ linePos }: { linePos: { lat: string; lng: string }[] }) => {
  const map = useSelector((state: RootState) => state.map.map);

  useEffect(() => {
    const linePath = linePos.map(
      (pos: { lat: string; lng: string }) =>
        new kakao.maps.LatLng(Number(pos.lat), Number(pos.lng))
    );
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 8,
      strokeColor: cssToken.COLOR['polyline-color'],
      strokeOpacity: 1,
      strokeStyle: 'shortdot',
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
