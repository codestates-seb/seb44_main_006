import { useSelector } from 'react-redux';

const Polyline = ({ linePos }) => {
  const map = useSelector((state: any) => state.map.map);

  const linePath = linePos.map(
    (pos) => new kakao.maps.LatLng(pos.lat, pos.lng)
  );

  const polyline = new kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 2,
    strokeColor: '#FFAE00',
    strokeOpacity: 0.7,
    strokeStyle: 'solid',
  });

  polyline.setMap(map);

  return null;
};

export default Polyline;
