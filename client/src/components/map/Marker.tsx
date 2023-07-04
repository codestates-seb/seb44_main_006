/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant';

type MarkerT = {
  lat?: number;
  lng?: number;
  image?: string | undefined;
  children: Props['children'];
};

const Marker = ({
  lat,
  lng,
  image = 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
  children,
  ...options
}: MarkerT) => {
  const map = useSelector((state: any) => state.map.map);
  const [state, setState] = useState({
    marker: null,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!map) return;
    const markerLat = lat || defaultOptions.lat;
    const markerLng = lng || defaultOptions.lng;
    const markerWidth = 20;
    const markerheight = 40;

    const markerImage = new kakao.maps.MarkerImage(
      image,
      new kakao.maps.Size(markerWidth, markerheight)
    );

    setState({
      marker: new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(markerLat, markerLng),
        image: markerImage,
      }),
    });

    // return () => {
    //   if (state && state.marker) state.marker.setMap(null);
    // };
  }, [map, image, lat, lng]);

  return <div>{children}</div>;
};

export default Marker;
