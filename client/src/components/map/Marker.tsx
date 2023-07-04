import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant';
import { markerActions } from '../../store/marker-slice';

type MarkerT = {
  lat?: number;
  lng?: number;
  id: number;
  children?: Props['children'];
};

const Marker = ({ lat, lng, id, children }: MarkerT) => {
  const map = useSelector((state: any) => state.map.map);
  const markerId = useSelector((state) => state.marker.markerId);
  const dispatch = useDispatch();

  useEffect(() => {
    const markerLat = lat || defaultOptions.lat;
    const markerLng = lng || defaultOptions.lng;
    const markerWidth = 20;
    const markerheight = 40;

    const image =
      markerId === id
        ? 'https://static.vecteezy.com/system/resources/previews/009/267/042/original/location-icon-design-free-png.png'
        : 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png';

    const markerImage = new kakao.maps.MarkerImage(
      image,
      new kakao.maps.Size(markerWidth, markerheight)
    );

    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(markerLat, markerLng),
      image: markerImage,
    });

    const setMarkerId = () => {
      dispatch(markerActions.selectMarker(id));
    };

    kakao.maps.event.addListener(marker, 'click', setMarkerId);

    return () => {
      if (marker) {
        marker.setMap(null);
        kakao.maps.event.removeListener(marker, 'click', setMarkerId);
      }
    };
  }, [map, lat, lng, markerId]);

  if (children) {
    return <div>{children}</div>;
  }

  return null;
};

export default Marker;
