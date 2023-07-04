/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant';
import { markerActions } from '../../store/marker-slice';

import { MarkerOff, MarkerOn } from '.';

type MarkerT = {
  lat?: number;
  lng?: number;
  id: number;
  img?: string;
  children?: Props['children'];
};

// Todo 장소 추가했을 때 marker 리덕스 markerID 초기화하기
const Marker = ({ lat, lng, id, img, children }: MarkerT) => {
  const map = useSelector((state: any) => state.map.map);
  const markerId = useSelector((state) => state.marker.markerId);
  const dispatch = useDispatch();

  useEffect(() => {
    const markerLat = lat || defaultOptions.lat;
    const markerLng = lng || defaultOptions.lng;
    const markerWidth = 20;
    const markerheight = 40;

    const setIamge = () => {
      if (img) {
        if (markerId === id) return MarkerOn[0];
        return MarkerOff[0];
      }
      if (markerId === id) return MarkerOn[id + 1];
      return MarkerOff[id + 1];
    };

    const image = setIamge();
    // markerId === id && !img
    //     ? MarkerOff[id + 1]
    //     : MarkerOn[id + 1] || (markerId === id && img)
    //     ? MarkerOn[0]
    //     : MarkerOff[0];

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
  }, [map, lat, lng, markerId, dispatch, id]);

  if (children) {
    return <div>{children}</div>;
  }

  return null;
};

export default Marker;
