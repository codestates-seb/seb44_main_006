import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Props, TextareaT } from '../../types/type';
import { mapActions } from '../../store/map-slice';
import useGeolocation from '../../hooks/useGeolocation';
import { RootState } from '../../store';

const MapContainer = styled.section<TextareaT>`
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
`;

type KakaoMapT = {
  width: string;
  height: string;
  children: Props['children'];
};

const KakaoMap = ({ width, height, children, ...options }: KakaoMapT) => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const curLocation = useGeolocation();
  const firstCourse = useSelector(
    (state: RootState) => state.marker.firstCourse
  );

  const loadHandler = useCallback(
    (element: HTMLElement) => {
      if (!kakao || !element) return;
      const currentPosition = {
        lat: curLocation.coords?.latitude || 37.553651,
        lng: curLocation.coords?.longitude || 126.969763,
      };

      const { lat, lng } =
        firstCourse?.lat && firstCourse?.lng ? firstCourse : currentPosition;
      const newMap = new kakao.maps.Map(element, {
        center: new kakao.maps.LatLng(Number(lat), Number(lng)),
        keyboardShortcuts: true,
      });
      dispatch(mapActions.setMap(newMap));
      setLoad(true);
    },
    [
      curLocation.coords?.latitude,
      curLocation.coords?.longitude,
      dispatch,
      firstCourse,
    ]
  );

  return (
    <MapContainer width={width} height={height} ref={loadHandler} {...options}>
      {load && children}
    </MapContainer>
  );
};

export default React.memo(KakaoMap);
