import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant/constant';
import { markerActions } from '../../store/marker-slice';
import { RootState } from '../../store';

import { MarkerOff, MarkerOn } from '.';

type MarkerT = {
  lat?: string;
  lng?: string;
  id: string;
  img?: string;
  idx?: number;
  children?: Props['children'];
};

// Todo 장소 추가했을 때 marker 리덕스 markerID 초기화하기
const Marker = ({ lat, lng, id, img, idx, children }: MarkerT) => {
  const map = useSelector((state: RootState) => state.map.map);
  const markerId = useSelector((state: RootState) => state.marker.markerId);
  const dispatch = useDispatch();

  useEffect(() => {
    const markerLat = Number(lat) || defaultOptions.lat;
    const markerLng = Number(lng) || defaultOptions.lng;
    const markerWidth = 30;
    const markerheight = 60;

    const setIamge = () => {
      const index = idx ?? -1;
      if (img) {
        if (markerId === id)
          return {
            image: MarkerOn[0],
            zIndex: 4,
          };
        return {
          image: MarkerOff[0],
          zIndex: 3,
        };
      }
      if (markerId === id) {
        return {
          image: MarkerOn[index + 1],
          zIndex: 4,
        };
      }
      return {
        image: MarkerOff[index + 1],
        zIndex: 3,
      };
    };

    const { image, zIndex } = setIamge();

    const markerImage = new kakao.maps.MarkerImage(
      image,
      new kakao.maps.Size(markerWidth, markerheight)
    );

    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(markerLat, markerLng),
      image: markerImage,
      zIndex,
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
  }, [map, lat, lng, markerId, dispatch, id, img, idx]);

  if (children) {
    return <div>{children}</div>;
  }

  return null;
};

export default React.memo(Marker);
