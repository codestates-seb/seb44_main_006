import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { Props, TextareaT } from '../../types/type';
import { mapActions } from '../../store/map-slice';
import useGeolocation from '../../hooks/useGeolocation';

const MapContainer = styled.section<TextareaT>`
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
`;

type KakaoMapT = {
  width: string;
  height: string;
  children: Props['children'];
  center?: { lat: string; lng: string; level: number };
};
const KakaoMap = ({
  center,
  width,
  height,
  children,
  ...options
}: KakaoMapT) => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const curLocation = useGeolocation();

  const loadHandler = useCallback(
    (element: HTMLElement) => {
      if (!kakao || !element) return;
      const currentPosition = {
        level: 3,
        lat: curLocation.coords?.latitude,
        lng: curLocation.coords?.longitude,
      };
      const { level = 3, lat, lng } = center ?? currentPosition;
      const newMap = new kakao.maps.Map(element, {
        level,
        center: new kakao.maps.LatLng(Number(lat), Number(lng)),
        keyboardShortcuts: true,
      });
      dispatch(mapActions.setMap(newMap));
      setState(true);
    },
    [
      curLocation.coords?.latitude,
      curLocation.coords?.longitude,
      center,
      dispatch,
    ]
  );

  return (
    <MapContainer width={width} height={height} ref={loadHandler} {...options}>
      {state && children}
    </MapContainer>
  );
};

export default React.memo(KakaoMap);
