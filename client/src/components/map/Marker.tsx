import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant';

type MarkerT = {
  lat?: number;
  lng?: number;
  image?: string | undefined;
  children?: Props['children'];
};

const Marker = ({
  lat,
  lng,
  image = 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
  children,
  ...options
}: MarkerT) => {
  const map = useSelector((state: any) => state.map.map);

  useEffect(() => {
    const markerLat = lat || defaultOptions.lat;
    const markerLng = lng || defaultOptions.lng;
    const markerWidth = 20;
    const markerheight = 40;

    const markerImage = new kakao.maps.MarkerImage(
      image,
      new kakao.maps.Size(markerWidth, markerheight)
    );

    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(markerLat, markerLng),
      image: markerImage,
    });

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [map, lat, lng, image]);

  if (children) {
    return <div>{children}</div>;
  }

  return null;
};

export default Marker;
