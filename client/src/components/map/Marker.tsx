import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Props } from '../../types/type';
import defaultOptions from '../../utils/constant/constant';
import { markerActions } from '../../store/marker-slice';
import { RootState } from '../../store';

import { MarkerOff, MarkerOn } from '.';

type MarkerT = {
  lat?: number;
  lng?: number;
  id: number;
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
    const markerLat = lat || defaultOptions.lat;
    const markerLng = lng || defaultOptions.lng;
    const markerWidth = 20;
    const markerheight = 40;

    const setIamge = () => {
      const index = idx ?? -1;
      if (img) {
        if (markerId === id) return MarkerOn[0];
        return MarkerOff[0];
      }
      if (markerId === id) return MarkerOn[index + 1];
      return MarkerOff[index + 1];
    };

    const image = setIamge();

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
  }, [map, lat, lng, markerId, dispatch, id, img, idx]);

  if (children) {
    return <div>{children}</div>;
  }

  return null;
};

export default Marker;
